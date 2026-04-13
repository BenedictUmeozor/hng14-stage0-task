// Todo Card Interactive Functionality

class TodoCard {
    constructor(cardElement) {
        this.card = cardElement;
        this.checkbox = this.card.querySelector('[data-testid="test-todo-complete-toggle"]');
        this.editBtn = this.card.querySelector('[data-testid="test-todo-edit-button"]');
        this.deleteBtn = this.card.querySelector('[data-testid="test-todo-delete-button"]');
        this.timeRemainingEl = this.card.querySelector('[data-testid="test-todo-time-remaining"]');
        this.statusBadge = this.card.querySelector('[data-testid="test-todo-status"]');
        
        // Due date configuration (May 1, 2026 at 6:00 PM UTC)
        this.dueDate = new Date('2026-05-01T18:00:00Z');
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.checkbox.addEventListener('change', () => this.handleToggleComplete());
        this.editBtn.addEventListener('click', () => this.handleEdit());
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
        
        // Initialize time remaining
        this.updateTimeRemaining();
        
        // Update time remaining every 60 seconds
        this.intervalId = setInterval(() => {
            this.updateTimeRemaining();
        }, 60000); // 60 seconds
        
        // Keyboard accessibility
        this.setupKeyboardNavigation();
    }
    
    handleToggleComplete() {
        const isCompleted = this.checkbox.checked;
        
        if (isCompleted) {
            this.card.classList.add('completed');
            this.statusBadge.textContent = 'Done';
            this.statusBadge.setAttribute('aria-label', 'Task status: Done');
            console.log('Task marked as complete');
        } else {
            this.card.classList.remove('completed');
            this.statusBadge.textContent = 'In Progress';
            this.statusBadge.setAttribute('aria-label', 'Task status: In Progress');
            console.log('Task marked as incomplete');
        }
    }
    
    handleEdit() {
        console.log('Edit button clicked');
        // In a real application, this would open an edit modal or form
        alert('Edit functionality would open here');
    }
    
    handleDelete() {
        console.log('Delete button clicked');
        // In a real application, this would show a confirmation dialog
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            this.card.style.animation = 'fadeOut 300ms ease-out forwards';
            setTimeout(() => {
                console.log('Task deleted');
                // In a real app, this would remove the card from the DOM
            }, 300);
        }
    }
    
    updateTimeRemaining() {
        const now = new Date();
        const diffMs = this.dueDate - now;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        let timeText = '';
        let className = '';
        
        if (diffMs < 0) {
            // Overdue
            const absDays = Math.abs(diffDays);
            const absHours = Math.abs(diffHours % 24);
            
            if (absDays > 0) {
                timeText = `Overdue by ${absDays} day${absDays !== 1 ? 's' : ''}`;
            } else if (absHours > 0) {
                timeText = `Overdue by ${absHours} hour${absHours !== 1 ? 's' : ''}`;
            } else {
                timeText = 'Overdue';
            }
            className = 'overdue';
        } else if (diffDays === 0 && diffHours === 0 && diffMinutes < 60) {
            // Due within the hour
            if (diffMinutes <= 5) {
                timeText = 'Due now!';
            } else {
                timeText = `Due in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
            }
            className = 'due-soon';
        } else if (diffDays === 0) {
            // Due today
            timeText = `Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
            className = 'due-soon';
        } else if (diffDays === 1) {
            // Due tomorrow
            timeText = 'Due tomorrow';
            className = 'due-soon';
        } else if (diffDays < 7) {
            // Due within a week
            timeText = `Due in ${diffDays} days`;
        } else if (diffDays < 30) {
            // Due within a month
            const weeks = Math.floor(diffDays / 7);
            timeText = `Due in ${weeks} week${weeks !== 1 ? 's' : ''}`;
        } else {
            // Due in more than a month
            const months = Math.floor(diffDays / 30);
            timeText = `Due in ${months} month${months !== 1 ? 's' : ''}`;
        }
        
        this.timeRemainingEl.textContent = timeText;
        this.timeRemainingEl.className = `time-remaining ${className}`;
    }
    
    setupKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        const focusableElements = [
            this.checkbox,
            this.editBtn,
            this.deleteBtn
        ];
        
        focusableElements.forEach((el, index) => {
            el.addEventListener('keydown', (e) => {
                // Space or Enter to activate
                if (e.key === ' ' || e.key === 'Enter') {
                    if (el === this.checkbox) {
                        // Let default behavior handle checkbox
                        return;
                    }
                    e.preventDefault();
                    el.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
                    focusableElements[prevIndex].focus();
                }
            });
        });
    }
    
    destroy() {
        // Clean up interval when card is removed
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Add fadeOut animation
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

// Initialize the todo card when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cardElement = document.querySelector('[data-testid="test-todo-card"]');
    if (cardElement) {
        const todoCard = new TodoCard(cardElement);
        
        // Store instance for potential cleanup
        window.todoCardInstance = todoCard;
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.todoCardInstance) {
        window.todoCardInstance.destroy();
    }
});
