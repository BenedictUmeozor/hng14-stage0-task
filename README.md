# Todo Card Component - Editorial Design

A clean, modern, and fully accessible Todo/Task Card component with a refined editorial aesthetic. Built with semantic HTML, CSS, and vanilla JavaScript.

## Design Philosophy

This component features a **magazine-inspired editorial design** with:
- Sophisticated typography pairing (Crimson Pro serif + DM Sans sans-serif)
- Warm, organic color palette with terracotta accents
- Generous spacing and refined micro-interactions
- Production-grade accessibility compliance

## Features

✅ **Fully Testable** - All required `data-testid` attributes implemented  
✅ **WCAG AA Compliant** - Semantic HTML, ARIA labels, keyboard navigation  
✅ **Responsive Design** - Works flawlessly from 320px to 1200px+  
✅ **Live Time Updates** - Automatic time-remaining calculation every 60 seconds  
✅ **Smooth Animations** - CSS-based transitions and micro-interactions  
✅ **Keyboard Accessible** - Full keyboard navigation with visible focus states  

## Required Test IDs

All automated test identifiers are implemented:

| Element | data-testid | Description |
|---------|-------------|-------------|
| Card Container | `test-todo-card` | Root `<article>` element |
| Title | `test-todo-title` | Task title (`<h2>`) |
| Description | `test-todo-description` | Task description (`<p>`) |
| Priority Badge | `test-todo-priority` | Priority indicator with icon |
| Due Date | `test-todo-due-date` | Formatted due date (`<time>`) |
| Time Remaining | `test-todo-time-remaining` | Live countdown display |
| Status Badge | `test-todo-status` | Current status indicator |
| Checkbox | `test-todo-complete-toggle` | Completion toggle (`<input type="checkbox">`) |
| Tags List | `test-todo-tags` | Tags container (`<ul>`) |
| Work Tag | `test-todo-tag-work` | Individual tag |
| Urgent Tag | `test-todo-tag-urgent` | Individual tag |
| Edit Button | `test-todo-edit-button` | Edit action button |
| Delete Button | `test-todo-delete-button` | Delete action button |

## Accessibility Features

### Semantic HTML
- `<article>` for card container
- `<h2>` for title hierarchy
- `<time>` with `datetime` attribute for dates
- `<ul role="list">` for tags
- `<button>` elements for actions
- `<input type="checkbox">` with proper `<label>`

### ARIA Support
- `aria-label` on all icon-only buttons
- `aria-live="polite"` on time-remaining for screen reader updates
- `aria-label` on status and priority badges for context
- Proper labeling on checkbox input

### Keyboard Navigation
- Full tab navigation through all interactive elements
- Arrow key navigation between focusable elements
- Space/Enter to activate buttons and checkbox
- Visible focus indicators (2px outline with offset)
- Logical tab order

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Focus indicators have sufficient contrast
- Interactive elements have clear hover/focus states

## Responsive Breakpoints

- **Mobile** (320px - 480px): Full-width, stacked layout
- **Tablet** (481px - 768px): Comfortable max-width with padding
- **Desktop** (769px+): Optimal 480px max-width, centered

## Time Remaining Logic

The component calculates time remaining dynamically:

- **Overdue**: "Overdue by X days/hours"
- **Due now**: "Due now!" (within 5 minutes)
- **Due soon**: "Due in X minutes/hours" (same day)
- **Due tomorrow**: "Due tomorrow"
- **Due this week**: "Due in X days"
- **Due later**: "Due in X weeks/months"

Updates automatically every 60 seconds with visual indicators for urgency.

## Interactive Behaviors

### Checkbox Toggle
- Toggles completion state
- Adds strike-through to title
- Changes status badge to "Done"
- Reduces card opacity
- Console logs action

### Edit Button
- Console logs "Edit button clicked"
- Shows alert (placeholder for modal)
- Fully keyboard accessible

### Delete Button
- Shows confirmation dialog
- Animates card fade-out on confirm
- Console logs action
- Fully keyboard accessible

## File Structure

```
├── todo-card.html    # Main HTML structure
├── styles.css        # Complete styling with CSS variables
├── script.js         # Interactive functionality
└── README.md         # This file
```

## Usage

Simply open `todo-card.html` in a modern browser. No build process required.

```bash
# Open in default browser
open todo-card.html
```

## Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent: #d4734b;
    --color-priority-high: #d4734b;
    --color-priority-medium: #e8a75d;
    --color-priority-low: #7ba88d;
}
```

### Due Date
Edit in `script.js`:

```javascript
this.dueDate = new Date('2026-05-01T18:00:00Z');
```

### Content
Edit HTML directly in `todo-card.html` for title, description, tags, etc.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern mobile browsers

## Testing Checklist

- [x] All `data-testid` attributes present
- [x] Checkbox is focusable and toggleable via keyboard
- [x] Time remaining shows reasonable value
- [x] Edit and Delete buttons are keyboard-focusable
- [x] Semantic HTML structure
- [x] Responsive layout (320px - 1200px)
- [x] No horizontal overflow with long text
- [x] Priority and status clearly displayed
- [x] ARIA labels on interactive elements
- [x] Visible focus indicators
- [x] Color contrast meets WCAG AA

## License

Free to use for any purpose.
