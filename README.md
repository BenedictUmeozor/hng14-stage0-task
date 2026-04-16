# Todo Card Component - Stage 1a (Interactive & Stateful)

A production-grade, fully interactive Todo/Task Card component with advanced state management, edit mode, and comprehensive accessibility. Built with semantic HTML, CSS, and vanilla JavaScript featuring a refined editorial aesthetic.

## 🎯 Stage 1a Overview

This is an **advanced interactive version** of the Stage 0 Todo Card. It now supports:
- ✅ Full edit mode with form validation
- ✅ Dynamic status transitions with sync logic
- ✅ Priority changes with visual indicators
- ✅ Expand/collapse for long descriptions
- ✅ Enhanced time management with overdue detection
- ✅ Rich accessibility patterns (focus trap, ARIA live regions)

## 🆕 What Changed from Stage 0

### New Features Added

#### 1. **Edit Mode**
- Click "Edit" to enter a full-featured edit form
- Inline editing for title, description, priority, and due date
- Save/Cancel buttons with state restoration
- Focus trap keeps keyboard navigation within the form
- Returns focus to Edit button on exit

#### 2. **Status Control System**
- Dropdown to manually change status (Pending → In Progress → Done)
- Bidirectional sync between checkbox and status dropdown
- Status changes trigger visual updates across the card
- Completed tasks show "Completed" instead of time remaining

#### 3. **Priority Visual Indicator**
- Left border accent changes color based on priority
- Low (green), Medium (amber), High (terracotta)
- Provides at-a-glance priority recognition
- Syncs with priority badge

#### 4. **Expand/Collapse Behavior**
- Descriptions over 200 characters auto-collapse
- "Show more/Show less" toggle button
- Smooth height transitions with gradient fade
- Fully keyboard accessible with `aria-expanded`

#### 5. **Enhanced Time Management**
- Updates every 30 seconds (improved from 60s)
- Granular time display: "Due in 45 minutes", "Due in 3 hours"
- Explicit overdue indicator badge with icon
- Visual state changes (red accents) when overdue
- Stops updating when task is marked complete

### Design Decisions

**Editorial Aesthetic Maintained**: Kept the magazine-inspired design with Crimson Pro + DM Sans typography and warm terracotta palette.

**Progressive Disclosure**: Edit mode replaces view mode entirely to reduce cognitive load and maintain focus.

**Visual Hierarchy**: Priority indicator on left border provides instant recognition without cluttering the interface.

**Smooth Transitions**: All state changes use CSS transitions for polished feel (250-400ms cubic-bezier easing).

**Mobile-First Forms**: Edit form fields stack vertically on mobile, side-by-side on desktop for optimal space usage.

## 📋 Complete Test ID Reference

### Stage 0 Test IDs (Retained)
| Element | data-testid | Description |
|---------|-------------|-------------|
| Card Container | `test-todo-card` | Root `<article>` element |
| Title | `test-todo-title` | Task title (`<h2>`) |
| Description | `test-todo-description` | Task description (`<p>`) |
| Priority Badge | `test-todo-priority` | Priority badge with icon |
| Due Date | `test-todo-due-date` | Formatted due date (`<time>`) |
| Time Remaining | `test-todo-time-remaining` | Live countdown display |
| Status Badge | `test-todo-status` | Current status indicator |
| Checkbox | `test-todo-complete-toggle` | Completion toggle |
| Tags List | `test-todo-tags` | Tags container (`<ul>`) |
| Work Tag | `test-todo-tag-work` | Individual tag |
| Urgent Tag | `test-todo-tag-urgent` | Individual tag |
| Edit Button | `test-todo-edit-button` | Edit action button |
| Delete Button | `test-todo-delete-button` | Delete action button |

### Stage 1a New Test IDs
| Element | data-testid | Description |
|---------|-------------|-------------|
| **Edit Form** |
| Edit Form Container | `test-todo-edit-form` | Edit mode `<form>` |
| Title Input | `test-todo-edit-title-input` | Title text input |
| Description Textarea | `test-todo-edit-description-input` | Description textarea |
| Priority Select | `test-todo-edit-priority-select` | Priority dropdown |
| Due Date Input | `test-todo-edit-due-date-input` | Date/time picker |
| Save Button | `test-todo-save-button` | Save changes button |
| Cancel Button | `test-todo-cancel-button` | Cancel edit button |
| **Status & Priority** |
| Status Control | `test-todo-status-control` | Status dropdown |
| Priority Indicator | `test-todo-priority-indicator` | Visual left border |
| **Expand/Collapse** |
| Collapsible Section | `test-todo-collapsible-section` | Description container |
| Expand Toggle | `test-todo-expand-toggle` | Show more/less button |
| **Time Management** |
| Overdue Indicator | `test-todo-overdue-indicator` | Overdue badge |

## ♿ Accessibility Features

### Stage 1a Enhancements

#### Edit Form Accessibility
- All inputs have proper `<label for="">` associations
- Focus trap keeps keyboard users within edit mode
- Returns focus to Edit button on exit (focus management)
- Form validation with HTML5 `required` attributes
- Clear visual focus indicators on all form fields

#### Status Control
- `<select>` with `aria-label="Change task status"`
- Keyboard navigable with arrow keys
- Syncs with checkbox for consistent state

#### Expand/Collapse
- `aria-expanded` attribute toggles true/false
- `aria-controls` links button to collapsible section
- Keyboard accessible (Space/Enter to toggle)
- Visual icon rotation indicates state

#### Live Updates
- Time remaining uses `aria-live="polite"`
- Screen readers announce time changes
- Stops announcing when task is complete

#### Overdue Indicator
- `aria-label="Task is overdue"` on badge
- Visual + semantic indication of urgency
- Color contrast meets WCAG AA standards

### Keyboard Navigation Flow

**View Mode:**
1. Tab → Checkbox
2. Tab → Status dropdown
3. Tab → Expand toggle (if visible)
4. Tab → Edit button
5. Tab → Delete button

**Edit Mode (Focus Trapped):**
1. Tab → Title input
2. Tab → Description textarea
3. Tab → Priority select
4. Tab → Due date input
5. Tab → Save button
6. Tab → Cancel button
7. Tab → (cycles back to Title)

## 🎨 Visual State Changes

### Priority States
- **Low**: Green left border + green badge background
- **Medium**: Amber left border + amber badge background
- **High**: Terracotta left border + terracotta badge background

### Status States
- **Pending**: Gray badge
- **In Progress**: Blue badge
- **Done**: Green badge + strike-through title + muted opacity

### Time States
- **Normal**: Warm gradient background
- **Due Soon** (<24 hours): Pulsing animation
- **Overdue**: Red gradient + overdue badge + red border accent
- **Completed**: Green gradient + "Completed" text

## 🔄 State Synchronization Logic

### Checkbox ↔ Status Sync
```
Checkbox checked → Status = "Done"
Status = "Done" → Checkbox checked
Checkbox unchecked (from Done) → Status = "Pending"
```

### Status Changes
```
Manual status change to "Done" → Checkbox checked + strike-through
Manual status change to "Pending/In Progress" → Checkbox unchecked
```

### Time Display Logic
```
Status = "Done" → Show "Completed" (stop updates)
Overdue → Show red badge + "Overdue by X"
Normal → Show "Due in X" (updates every 30s)
```

## 📱 Responsive Behavior

### Mobile (320px - 480px)
- Edit form fields stack vertically
- Save/Cancel buttons stack vertically
- Full-width card
- Metadata grid becomes single column

### Tablet (481px - 768px)
- Edit form: Priority and Due Date side-by-side
- Comfortable padding and spacing
- Tags wrap naturally

### Desktop (769px+)
- Optimal 480px max-width
- All form fields maintain comfortable sizing
- Hover states on all interactive elements

## 🧪 Testing Checklist

### Stage 0 Features (Still Working)
- [x] All original test IDs present
- [x] Checkbox toggles completion
- [x] Time remaining updates
- [x] Responsive layout
- [x] Semantic HTML
- [x] WCAG AA contrast

### Stage 1a New Features
- [x] Edit mode fully functional
- [x] Save updates all card values
- [x] Cancel restores previous state
- [x] Status dropdown syncs with checkbox
- [x] Priority indicator changes color
- [x] Expand/collapse works correctly
- [x] Overdue indicator appears when overdue
- [x] Time stops updating when complete
- [x] Focus trap in edit mode
- [x] Focus returns to Edit button on exit
- [x] All form fields have labels
- [x] Keyboard navigation works in both modes
- [x] No layout breaking with long content

## 🚀 Usage

Simply open `index.html` in a modern browser. No build process required.

```bash
# Open in default browser
open index.html
```

## 🎛️ Customization

### Change Initial State
Edit in `script.js`:

```javascript
this.state = {
    title: 'Your task title',
    description: 'Your description',
    priority: 'High', // Low, Medium, High
    dueDate: new Date('2026-05-01T18:00:00Z'),
    status: 'In Progress', // Pending, In Progress, Done
    completed: false
};
```

### Adjust Collapse Threshold
In `script.js`:

```javascript
const maxLength = 200; // Characters before auto-collapse
```

### Update Interval
In `script.js`:

```javascript
setInterval(() => {
    this.updateTimeRemaining();
}, 30000); // 30 seconds (30000ms)
```

## 📁 File Structure

```
├── index.html        # Main HTML with view + edit modes
├── styles.css        # Complete styling with state variants
├── script.js         # Interactive functionality + state management
└── README.md         # This file
```

## ⚠️ Known Limitations

1. **Single Card Only**: This is a component demo, not a full todo app
2. **No Persistence**: State resets on page reload (no localStorage/backend)
3. **No Tag Editing**: Tags are static in this version
4. **Delete Animation**: Card animates but doesn't actually remove from DOM
5. **Date Validation**: Allows past dates in edit mode (no validation)
6. **No Undo**: Once saved, changes are permanent (until page reload)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern mobile browsers

## 📝 Accessibility Notes

- **WCAG 2.1 Level AA Compliant**: All color contrasts meet 4.5:1 minimum
- **Keyboard Only**: Fully usable without a mouse
- **Screen Reader Tested**: Works with NVDA, JAWS, VoiceOver
- **Focus Management**: Proper focus trap and restoration
- **Semantic HTML**: Proper heading hierarchy, form labels, ARIA attributes
- **Live Regions**: Time updates announced to screen readers

## 🎓 What I Learned Building This

- **State Management**: Keeping checkbox, status dropdown, and visual states in sync
- **Focus Management**: Trapping focus in edit mode and restoring it on exit
- **Progressive Enhancement**: Starting with semantic HTML, enhancing with JS
- **Accessibility Patterns**: ARIA live regions, expanded states, focus traps
- **CSS State Management**: Using classes for visual state changes
- **Form Handling**: Proper label associations and validation

## 📄 License

Free to use for any purpose.

---

**Stage 0 → Stage 1a Evolution**: From static display to fully interactive, stateful component with advanced accessibility and polished UX. 🚀
