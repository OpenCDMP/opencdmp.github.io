<!-- to enable rename file to screenshots.md---
sidebar_position: 3
description: Guidelines for capturing and adding screenshots to documentation
---

# Screenshots Guide

This guide explains how to capture, optimize, and add screenshots to the OpenCDMP documentation.

## Screenshot Standards

### When to Add Screenshots

✅ **Do include screenshots for**:
- Complex user interfaces (forms, editors, dashboards)
- Step-by-step instructions where UI changes
- Configuration screens (Keycloak, admin panels)
- Visual results of actions (notifications, exports)
- Error messages and alerts
- Multi-step workflows where visual confirmation helps

❌ **Don't include screenshots for**:
- Simple text-based concepts
- Command-line operations (use code blocks instead)
- Content that changes frequently (version numbers, dates)
- Sensitive information (passwords, API keys, real user data)

---

## Capturing Screenshots

### Tools

**Recommended Tools**:
- **Windows**: Snipping Tool, Snip & Sketch (Win + Shift + S)
- **macOS**: Screenshot utility (Cmd + Shift + 4)
- **Linux**: GNOME Screenshot, Flameshot, Spectacle
- **Browser Extensions**: Awesome Screenshot, Nimbus Screenshot

### Best Practices

#### 1. **Clean Browser Environment**

Before capturing:
- Close unnecessary browser tabs
- Hide bookmarks bar
- Use incognito/private mode if needed
- Clear any autofill suggestions
- Disable browser extensions that add UI elements

#### 2. **Consistent Viewport**

- Use consistent browser window size (recommended: 1920x1080 or 1440x900)
- Zoom level: 100% (default)
- For full-page screenshots, use browser tools or extensions

#### 3. **Test Data**

Use realistic but fake data:
- **Plan titles**: "Marine Biology Research Data Management Plan"
- **User names**: "Dr. Sarah Chen", "Alex Rodriguez"
- **Emails**: "sarah.chen@example.org"
- **Dates**: Use current year
- **Organizations**: "Example University", "Research Institute"

❌ **Never use**:
- Real user data
- Real email addresses
- Production credentials
- Real API keys or tokens
- Real DOIs (use example: "10.5281/zenodo.1234567")

#### 4. **Highlight Important Areas**

Use arrows or boxes to draw attention:
- Red box: Highlight the area user should focus on
- Arrow: Point to specific button or field
- Number circles: For multi-step sequences

**Tools for annotations**:
- Built-in OS tools
- GIMP, Paint.NET (Windows)
- Skitch, Preview (macOS)
- GIMP, Krita (Linux)

#### 5. **Crop Appropriately**

- Remove unnecessary browser chrome (address bar, bookmarks)
- Keep only relevant UI elements
- Leave some context (don't crop too tightly)
- For full workflows, capture entire page or logical sections

---

## Image Specifications

### File Format

- **Format**: PNG (preferred) or JPEG
  - **PNG**: For UI screenshots with text (lossless, sharp text)
  - **JPEG**: For photographs or images with many colors (smaller file size)
- **Quality**: High quality, but optimized for web

### File Size

- **Target**: Under 500 KB per image
- **Maximum**: 1 MB
- Use optimization tools to reduce file size without quality loss

### Resolution

- **Screen captures**: Retina/HiDPI if available, but optimize for web
- **Width**: 800-1600px (will scale in documentation)
- **Don't use**: Extremely high resolution (4K+) without optimization

### Optimization Tools

**Command-line**:
```bash -->
<!-- # Install ImageMagick
# Windows: choco install imagemagick
# macOS: brew install imagemagick
# Linux: apt install imagemagick

# Optimize PNG
magick convert input.png -quality 95 -strip output.png

# Resize to width 1200px (maintains aspect ratio)
magick convert input.png -resize 1200x output.png

# Convert to JPEG (for photos)
magick convert input.png -quality 85 output.jpg
```

**GUI Tools**:
- **TinyPNG** (https://tinypng.com/) - Online PNG/JPEG optimization
- **ImageOptim** (macOS)
- **FileOptimizer** (Windows)
- **Trimage** (Linux)

**Batch Optimization**:
```bash
# Optimize all PNG files in a directory
for file in *.png; do
  magick convert "$file" -quality 95 -strip "optimized_$file"
done
```

---

## File Naming

### Naming Convention

Use descriptive, lowercase names with hyphens:

```
feature-name-action-description.png
```

**Examples**:
- `plan-create-blueprint-selection.png`
- `admin-blueprint-add-section.png`
- `description-edit-field-types.png`
- `keycloak-realm-settings-tokens.png`
- `error-authentication-failed.png`

**Pattern**:
```
[component]-[action]-[detail].png
```

❌ **Don't use**:
- `Screenshot 2024-01-01.png`
- `Image1.png`
- `Untitled.png`
- Spaces or special characters: `My Screenshot!.png`

### Versioning

For screenshots that may change:
- Store in `docs/assets/screenshots/[version]/`
- Example: `docs/assets/screenshots/v3.7/plan-editor.png`
- Update references when UI changes

---

## Directory Structure

### Where to Store Screenshots

```
docs/
├── assets/
│   ├── screenshots/
│   │   ├── getting-started/
│   │   │   ├── architecture-diagram.png
│   │   │   └── deployment-overview.png
│   │   ├── user-guide/
│   │   │   ├── plan-create-step1.png
│   │   │   ├── plan-create-step2.png
│   │   │   └── description-editor.png
│   │   ├── admin-guide/
│   │   │   ├── blueprint-list.png
│   │   │   ├── blueprint-editor.png
│   │   │   └── user-management.png
│   │   ├── configuration/
│   │   │   ├── keycloak-realm-settings.png
│   │   │   └── keycloak-client-config.png
│   │       ├── error-login-failed.png
│   │       └── docker-logs-example.png
│   └── diagrams/
│       ├── architecture-high-level.svg
│       └── workflow-plan-creation.svg
```

**Guidelines**:
- Store screenshots in subdirectories matching documentation structure
- Use `diagrams/` for vector graphics (SVG) and Mermaid exports
- Use `screenshots/` for UI captures

---

## Adding Screenshots to Documentation

### Markdown Syntax

#### Basic Image

```markdown
![Alt text description](../assets/screenshots/category/image-name.png)
```

**Example**:
```markdown
![Plan creation blueprint selection screen](../assets/screenshots/user-guide/plan-create-blueprint-selection.png)
```

#### Image with Caption

Use HTML for more control:

```html
<figure>
  <img src="../assets/screenshots/user-guide/plan-create-step1.png" alt="Creating a new plan" />
  <figcaption>Step 1: Select a blueprint for your plan</figcaption>
</figure>
```

#### Inline Image with Size Control

```html
<img src="../assets/screenshots/admin/blueprint-icon.png" alt="Blueprint icon" width="400" />
```

#### Multiple Images Side-by-Side

```html
<div style="display: flex; gap: 10px;">
  <img src="../assets/screenshots/before.png" alt="Before" style="width: 48%;" />
  <img src="../assets/screenshots/after.png" alt="After" style="width: 48%;" />
</div>
```

### Alt Text Best Practices

**Good alt text**:
- Describes what's in the image
- Concise but informative
- Helps users with screen readers

✅ **Examples**:
- "Plan editor showing sections and descriptions"
- "Blueprint configuration screen with section list"
- "Keycloak realm settings page with token configuration"

❌ **Avoid**:
- "Screenshot"
- "Image1"
- Empty alt text (unless decorative)
- Overly long descriptions

### Accessibility

#### 1. **Always provide alt text**

```markdown
![Description of image content](path/to/image.png)
```

#### 2. **Use descriptive captions**

For complex images, add a caption explaining context:

```html
<figure>
  <img src="complex-diagram.png" alt="OpenCDMP architecture diagram" />
  <figcaption>
    The diagram shows the main components of OpenCDMP: Frontend (Angular),
    Backend (Java), Keycloak (Authentication), PostgreSQL (Database),
    and RabbitMQ (Message Broker).
  </figcaption>
</figure>
```

#### 3. **Provide text alternatives for workflows**

If showing a multi-step process with screenshots, also describe steps in text:

```markdown
### Creating a Plan

Follow these steps to create your first plan:

1. **Navigate to Plans**: Click the "Plans" menu item
   ![Plans menu item highlighted](screenshots/step1.png)

2. **Create New Plan**: Click the "New Plan" button
   ![New Plan button in toolbar](screenshots/step2.png)

3. **Select Blueprint**: Choose a blueprint from the list
   ![Blueprint selection dialog](screenshots/step3.png)
```

---

## Screenshot Workflow

### Step-by-Step Process

#### 1. **Plan**
- Identify which pages/screens to capture
- Prepare test environment with clean data
- Create a checklist of needed screenshots

#### 2. **Capture**
- Set up browser environment (size, zoom, clean UI)
- Use test data (never real user data)
- Capture at consistent resolution
- Take multiple shots if needed (can choose best later)

#### 3. **Edit**
- Crop to relevant area
- Add annotations if needed (arrows, boxes, numbers)
- Blur or remove any sensitive information
- Ensure text is readable

#### 4. **Optimize**
- Resize if too large (target: 1200px width)
- Compress to reduce file size (target: under 500KB)
- Save with descriptive filename

#### 5. **Add to Documentation**
- Place in appropriate `assets/screenshots/` subdirectory
- Add to markdown with alt text
- Test rendering in Docusaurus dev server

#### 6. **Review**
- Check screenshot renders correctly
- Verify alt text is descriptive
- Confirm file size is reasonable
- Test on mobile/tablet viewports

---

## Maintaining Screenshots

### When to Update

Update screenshots when:
- UI design changes significantly
- Feature functionality changes
- Text/labels in UI are updated
- Screenshots show outdated information (old version numbers)
- Branding/logos change

### Batch Updates

For UI redesigns affecting many screenshots:

1. Create task list of screenshots to update
2. Set up test environment with new UI
3. Recapture all affected screenshots
4. Keep naming consistent with old versions
5. Replace files in `assets/screenshots/`
6. Test all pages to ensure images load

### Version Management

For major version updates:

```
docs/assets/screenshots/
├── v3.6/
│   ├── plan-editor.png
│   └── blueprint-editor.png
├── v3.7/  (current)
│   ├── plan-editor.png
│   └── blueprint-editor.png
```

Update markdown references when version changes:

```markdown -->
<!-- Old -->
<!-- ![Plan editor](../assets/screenshots/v3.6/plan-editor.png) -->

<!-- New -->
<!-- ![Plan editor](../assets/screenshots/v3.7/plan-editor.png) -->
<!-- ``` -->

<!-- ---

## Testing and Validation

### Checklist Before Committing

- [ ] Screenshot is clear and readable
- [ ] File size is under 1MB (ideally under 500KB)
- [ ] Filename follows naming convention
- [ ] No sensitive information visible
- [ ] Alt text is descriptive and helpful
- [ ] Image renders correctly in Docusaurus
- [ ] Image is accessible (tested with screen reader if possible)
- [ ] Test data is used (not real user data)
- [ ] Screenshot is in correct directory
- [ ] Image is referenced correctly in markdown

### Testing in Docusaurus

```bash -->
<!-- # Start dev server
npm start

# View your page
# Check that images load correctly
# Test on different screen sizes (resize browser)
# Check dark mode if applicable
```

### Automated Checks

Check for broken image links:

```bash
# Find all markdown files with image references
grep -r "!\[.*\](.*\.png)" docs/

# Check if files exist
# (Manual verification or write script)
```

---

## Examples

### Good Screenshot Example

```markdown
## Creating a Plan

To create a new plan, follow these steps:

1. Navigate to the **Plans** page by clicking "Plans" in the main menu

2. Click the **New Plan** button in the top-right corner

   ![New Plan button highlighted in the Plans page toolbar](../assets/screenshots/user-guide/plan-create-button.png)

3. Select a blueprint from the list. The blueprint defines the structure of your plan.

   ![Blueprint selection dialog showing available blueprint templates](../assets/screenshots/user-guide/plan-blueprint-selection.png)

4. Enter a title for your plan and click **Create**

   ![Plan creation form with title field and Create button](../assets/screenshots/user-guide/plan-create-form.png)
```

### Screenshot with Annotations Example

For complex interfaces, add annotations:

```markdown
### Plan Editor Interface

The plan editor consists of several key areas:

![Annotated plan editor showing numbered sections: 1) Plan metadata, 2) Section tabs, 3) Description list, 4) Action toolbar, 5) Save button](../assets/screenshots/user-guide/plan-editor-annotated.png)

1. **Plan Metadata**: Title, description, and status
2. **Section Tabs**: Navigate between plan sections
3. **Description List**: Descriptions within the current section
4. **Action Toolbar**: Add descriptions, export, share
5. **Save Button**: Save changes to the plan
```

---

## Tools and Resources

### Screenshot Capture
- [Awesome Screenshot](https://www.awesomescreenshot.com/) - Browser extension
- [ShareX](https://getsharex.com/) - Windows
- [Flameshot](https://flameshot.org/) - Linux
- [Cleanshot X](https://cleanshot.com/) - macOS (paid)

### Image Editing
- [GIMP](https://www.gimp.org/) - Free, cross-platform
- [Paint.NET](https://www.getpaint.net/) - Windows
- [Krita](https://krita.org/) - Cross-platform
- [Photopea](https://www.photopea.com/) - Online Photoshop alternative

### Image Optimization
- [TinyPNG](https://tinypng.com/) - Online compression
- [ImageOptim](https://imageoptim.com/) - macOS
- [Squoosh](https://squoosh.app/) - Online image optimizer (Google)

### Diagram Creation
- [Mermaid](https://mermaid.js.org/) - Text-based diagrams (built into Docusaurus)
- [Excalidraw](https://excalidraw.com/) - Hand-drawn style diagrams
- [Draw.io](https://app.diagrams.net/) - Professional diagrams

---

## Related Documentation

- [Style Guide](https://github.com/OpenCDMP/docs-internal/blob/main/STYLE_GUIDE.md) - Writing conventions and terminology
- [Contributing Guide](index.md) - How to contribute to documentation

--- 

## Questions?

If you have questions about screenshots or need help:

1. Check existing screenshots for examples
2. Review this guide
3. Contact the documentation team: opencdmp at cite.gr
-->
