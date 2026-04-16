class TodoCard {
    constructor(cardElement) {
        this.card = cardElement;
        this.viewMode = this.card.querySelector('.card-view-mode');
        this.checkbox = this.card.querySelector('[data-testid="test-todo-complete-toggle"]');
        this.titleEl = this.card.querySelector('[data-testid="test-todo-title"]');
        this.descriptionEl = this.card.querySelector('[data-testid="test-todo-description"]');
        this.priorityBadge = this.card.querySelector('[data-testid="test-todo-priority"]');
        this.priorityIndicator = this.card.querySelector('[data-testid="test-todo-priority-indicator"]');
        this.dueDateEl = this.card.querySelector('[data-testid="test-todo-due-date"]');
        this.timeRemainingEl = this.card.querySelector('[data-testid="test-todo-time-remaining"]');
        this.timeContainer = this.card.querySelector('.time-remaining-container');
        this.overdueIndicator = this.card.querySelector('[data-testid="test-todo-overdue-indicator"]');
        this.statusBadge = this.card.querySelector('[data-testid="test-todo-status"]');
        this.statusControl = this.card.querySelector('[data-testid="test-todo-status-control"]');
        this.editBtn = this.card.querySelector('[data-testid="test-todo-edit-button"]');
        this.deleteBtn = this.card.querySelector('[data-testid="test-todo-delete-button"]');
        this.collapsibleSection = this.card.querySelector('[data-testid="test-todo-collapsible-section"]');
        this.expandToggle = this.card.querySelector('[data-testid="test-todo-expand-toggle"]');
        this.editMode = this.card.querySelector('[data-testid="test-todo-edit-form"]');
        this.editTitleInput = this.card.querySelector('[data-testid="test-todo-edit-title-input"]');
        this.editDescriptionInput = this.card.querySelector('[data-testid="test-todo-edit-description-input"]');
        this.editPrioritySelect = this.card.querySelector('[data-testid="test-todo-edit-priority-select"]');
        this.editDueDateInput = this.card.querySelector('[data-testid="test-todo-edit-due-date-input"]');
        this.saveBtn = this.card.querySelector('[data-testid="test-todo-save-button"]');
        this.cancelBtn = this.card.querySelector('[data-testid="test-todo-cancel-button"]');
        
        this.state = {
            title: 'Redesign landing page hero section',
            description: 'Update the hero section with new brand guidelines, including typography refresh, improved CTA placement, and mobile-optimized imagery. Ensure accessibility standards are met and performance metrics stay under 2s LCP. This is a critical task that requires coordination with the design team and careful testing across multiple devices and browsers.',
            priority: 'High',
            dueDate: new Date('2026-05-01T18:00:00Z'),
            status: 'In Progress',
            completed: false,
            expanded: false
        };
        
        this.previousState = null;
        
        this.init();
    }
    
    init() {
        this.checkbox.addEventListener('change', () => this.handleToggleComplete());
        this.statusControl.addEventListener('change', () => this.handleStatusChange());
        this.editBtn.addEventListener('click', () => this.enterEditMode());
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
        this.expandToggle.addEventListener('click', () => this.toggleExpand());
        this.editMode.addEventListener('submit', (e) => this.handleSave(e));
        this.cancelBtn.addEventListener('click', () => this.exitEditMode(true));
        
        this.checkDescriptionLength();
        this.updateTimeRemaining();
        
        this.intervalId = setInterval(() => {
            if (!this.state.completed) {
                this.updateTimeRemaining();
            }
        }, 30000);
        
        this.updatePriorityIndicator();
        this.setupKeyboardNavigation();
    }
    
    checkDescriptionLength() {
        const description = this.state.description;
        const maxLength = 200;
        
        if (description.length > maxLength) {
            this.collapsibleSection.classList.add('collapsed');
            this.expandToggle.classList.remove('hidden');
            this.state.expanded = false;
        } else {
            this.expandToggle.classList.add('hidden');
        }
    }
    
    toggleExpand() {
        this.state.expanded = !this.state.expanded;
        
        if (this.state.expanded) {
            this.collapsibleSection.classList.remove('collapsed');
            this.expandToggle.setAttribute('aria-expanded', 'true');
            this.expandToggle.querySelector('.expand-text').textContent = 'Show less';
        } else {
            this.collapsibleSection.classList.add('collapsed');
            this.expandToggle.setAttribute('aria-expanded', 'false');
            this.expandToggle.querySelector('.expand-text').textContent = 'Show more';
        }
    }
    
    handleToggleComplete() {
        this.state.completed = this.checkbox.checked;
        
        if (this.state.completed) {
            this.state.status = 'Done';
            this.statusControl.value = 'Done';
            this.card.classList.add('completed');
            this.updateStatusDisplay();
            this.updateTimeDisplay();
            console.log('Task marked as complete');
        } else {
            this.state.status = 'Pending';
            this.statusControl.value = 'Pending';
            this.card.classList.remove('completed');
            this.updateStatusDisplay();
            this.updateTimeRemaining();
            console.log('Task marked as incomplete');
        }
    }
    
    handleStatusChange() {
        const newStatus = this.statusControl.value;
        this.state.status = newStatus;
        
        if (newStatus === 'Done') {
            this.state.completed = true;
            this.checkbox.checked = true;
            this.card.classList.add('completed');
            this.updateTimeDisplay();
        } else {
            this.state.completed = false;
            this.checkbox.checked = false;
            this.card.classList.remove('completed');
            this.updateTimeRemaining();
        }
        
        this.updateStatusDisplay();
        console.log('Status changed to:', newStatus);
    }
    
    updateStatusDisplay() {
        this.statusBadge.textContent = this.state.status;
        this.statusBadge.setAttribute('aria-label', `Task status: ${this.state.status}`);
        
        this.statusBadge.className = 'status-badge';
        if (this.state.status === 'Done') {
            this.statusBadge.style.background = 'var(--color-status-done)';
        } else if (this.state.status === 'In Progress') {
            this.statusBadge.style.background = 'var(--color-status-progress)';
        } else {
            this.statusBadge.style.background = 'var(--color-status-pending)';
        }
    }
    
    updateTimeDisplay() {
        if (this.state.completed) {
            this.timeRemainingEl.textContent = 'Completed';
            this.timeContainer.classList.remove('overdue-state');
            this.timeContainer.classList.add('completed-state');
            this.overdueIndicator.classList.add('hidden');
            this.card.classList.remove('overdue');
        }
    }
    
    updateTimeRemaining() {
        const now = new Date();
        const diffMs = this.state.dueDate - now;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        let timeText = '';
        let isOverdue = false;
        
        if (diffMs < 0) {
            isOverdue = true;
            const absDays = Math.abs(diffDays);
            const absHours = Math.abs(diffHours % 24);
            const absMinutes = Math.abs(diffMinutes % 60);
            
            if (absDays > 0) {
                timeText = `Overdue by ${absDays} day${absDays !== 1 ? 's' : ''}`;
            } else if (absHours > 0) {
                timeText = `Overdue by ${absHours} hour${absHours !== 1 ? 's' : ''}`;
            } else if (absMinutes > 0) {
                timeText = `Overdue by ${absMinutes} minute${absMinutes !== 1 ? 's' : ''}`;
            } else {
                timeText = 'Overdue';
            }
        } else if (diffMinutes < 60) {
            if (diffMinutes <= 5) {
                timeText = 'Due now!';
            } else {
                timeText = `Due in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
            }
        } else if (diffHours < 24) {
            timeText = `Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
        } else if (diffDays === 1) {
            timeText = 'Due tomorrow';
        } else if (diffDays < 7) {
            timeText = `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            timeText = `Due in ${weeks} week${weeks !== 1 ? 's' : ''}`;
        } else {
            const months = Math.floor(diffDays / 30);
            timeText = `Due in ${months} month${months !== 1 ? 's' : ''}`;
        }
        
        this.timeRemainingEl.textContent = timeText;
        
        if (isOverdue) {
            this.overdueIndicator.classList.remove('hidden');
            this.timeContainer.classList.add('overdue-state');
            this.card.classList.add('overdue');
        } else {
            this.overdueIndicator.classList.add('hidden');
            this.timeContainer.classList.remove('overdue-state');
            this.card.classList.remove('overdue');
        }
        
        if (diffHours < 24 && diffMs > 0) {
            this.timeRemainingEl.classList.add('due-soon');
        } else {
            this.timeRemainingEl.classList.remove('due-soon');
        }
    }
    
    updatePriorityIndicator() {
        this.priorityIndicator.className = 'priority-indicator';
        this.priorityIndicator.classList.add(`priority-${this.state.priority.toLowerCase()}`);
    }
    
    enterEditMode() {
        this.previousState = { ...this.state };
        
        this.editTitleInput.value = this.state.title;
        this.editDescriptionInput.value = this.state.description;
        this.editPrioritySelect.value = this.state.priority;
        
        const dateStr = this.formatDateForInput(this.state.dueDate);
        this.editDueDateInput.value = dateStr;
        
        this.viewMode.classList.add('hidden');
        this.editMode.classList.remove('hidden');
        this.card.classList.add('edit-mode');
        
        this.editTitleInput.focus();
        this.setupFocusTrap();
        
        console.log('Entered edit mode');
    }
    
    exitEditMode(cancelled = false) {
        if (cancelled && this.previousState) {
            this.state = { ...this.previousState };
            console.log('Edit cancelled');
        }
        
        this.editMode.classList.add('hidden');
        this.viewMode.classList.remove('hidden');
        this.card.classList.remove('edit-mode');
        
        this.editBtn.focus();
        
        this.previousState = null;
    }
    
    handleSave(e) {
        e.preventDefault();
        
        this.state.title = this.editTitleInput.value.trim();
        this.state.description = this.editDescriptionInput.value.trim();
        this.state.priority = this.editPrioritySelect.value;
        this.state.dueDate = new Date(this.editDueDateInput.value);
        
        this.titleEl.textContent = this.state.title;
        this.descriptionEl.textContent = this.state.description;
        this.updatePriorityDisplay();
        this.updateDueDateDisplay();
        this.updateTimeRemaining();
        this.updatePriorityIndicator();
        this.checkDescriptionLength();
        
        this.exitEditMode(false);
        
        console.log('Changes saved:', this.state);
    }
    
    updatePriorityDisplay() {
        const priorityIcon = this.priorityBadge.querySelector('.priority-icon');
        this.priorityBadge.innerHTML = '';
        this.priorityBadge.appendChild(priorityIcon);
        this.priorityBadge.appendChild(document.createTextNode(this.state.priority));
        this.priorityBadge.className = 'priority-badge';
        this.priorityBadge.classList.add(`priority-${this.state.priority.toLowerCase()}`);
        this.priorityBadge.setAttribute('aria-label', `Priority level: ${this.state.priority}`);
    }
    
    updateDueDateDisplay() {
        const formatted = this.formatDateForDisplay(this.state.dueDate);
        this.dueDateEl.textContent = formatted;
        this.dueDateEl.setAttribute('datetime', this.state.dueDate.toISOString());
    }
    
    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    formatDateForDisplay(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return `Due ${date.toLocaleDateString('en-US', options)}`;
    }
    
    handleDelete() {
        console.log('Delete button clicked');
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            this.card.style.animation = 'fadeOut 300ms ease-out forwards';
            setTimeout(() => {
                console.log('Task deleted');
            }, 300);
        }
    }
    
    setupFocusTrap() {
        const focusableElements = this.editMode.querySelectorAll(
            'input, textarea, select, button'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };
        
        this.editMode.addEventListener('keydown', handleTabKey);
    }
    
    setupKeyboardNavigation() {
        const focusableElements = [
            this.checkbox,
            this.statusControl,
            this.expandToggle,
            this.editBtn,
            this.deleteBtn
        ].filter(el => el && !el.classList.contains('hidden'));
        
        focusableElements.forEach((el, index) => {
            el.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    if (el === this.checkbox || el === this.statusControl) {
                        return;
                    }
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    const cardElement = document.querySelector('[data-testid="test-todo-card"]');
    if (cardElement) {
        const todoCard = new TodoCard(cardElement);
        window.todoCardInstance = todoCard;
    }
});

window.addEventListener('beforeunload', () => {
    if (window.todoCardInstance) {
        window.todoCardInstance.destroy();
    }
});
