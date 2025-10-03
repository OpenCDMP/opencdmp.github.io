<!-- to enable rename file to index.md---
sidebar_position: 1
description: How to contribute to OpenCDMP documentation
---

# Contributing to Documentation

Thank you for your interest in improving the OpenCDMP documentation! This guide explains how to contribute.

## What You Can Contribute

We welcome contributions in many forms:

- 📝 **Content improvements**: Fix typos, clarify explanations, add examples
- 📸 **Screenshots**: Add or update UI screenshots
- 🎨 **Diagrams**: Create or improve architecture and workflow diagrams
- 🔧 **Configuration examples**: Share working configurations and best practices
- 📚 **Tutorials**: Write step-by-step guides for specific use cases
- 🐛 **Issue reports**: Report unclear documentation or missing information
- 🌍 **Translations**: Help translate documentation to other languages (future)

## Documentation Standards

OpenCDMP documentation maintains high quality standards. Please review these guidelines before contributing:

### Style Guide

All documentation follows the [Style Guide](https://github.com/OpenCDMP/docs-internal/blob/main/STYLE_GUIDE.md), which covers:

- Writing style and tone
- Terminology and product names
- Formatting conventions
- Code examples and syntax

**Key Points**:
- Use formal language (no contractions)
- Capitalize product names correctly (OpenCDMP, PostgreSQL, Keycloak)
- Use absolute paths for internal links
- Include "Required" columns in configuration tables

### Screenshots

When adding screenshots, follow the [Screenshots Guide](screenshots.md):

- Use test data (never real user data)
- Capture at consistent resolution (1920x1080 or 1440x900)
- Optimize file size (target: under 500KB)
- Use descriptive filenames (`feature-action-description.png`)
- Always include alt text for accessibility
- Store in `docs/assets/screenshots/[category]/`

### Diagrams

For visual documentation:

- Use [Mermaid](https://mermaid.js.org/) for diagrams (supported natively in Docusaurus)
- Export complex diagrams as SVG for scalability
- Store diagram source code in documentation for maintainability

## How to Contribute

### 1. Small Fixes (Typos, Links, Minor Edits)

For small changes, you can edit directly on GitHub:

1. Navigate to the page you want to edit
2. Click the **Edit this page** link at the bottom
3. Make your changes in the GitHub editor
4. Submit a pull request with a clear description

### 2. Larger Contributions (New Pages, Significant Changes)

For substantial contributions:

#### Step 1: Set Up Local Environment

```bash
# Clone the repository
git clone https://github.com/OpenCDMP/docs-internal.git
cd docs-internal

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`. Changes will hot-reload automatically.

#### Step 2: Create a Branch

```bash
# Create a new branch for your contribution
git checkout -b feature/your-contribution-name

# Examples:
# git checkout -b docs/add-backup-guide
# git checkout -b fix/broken-links-section
# git checkout -b screenshots/admin-interface
```

#### Step 3: Make Your Changes

- Edit or create markdown files in `docs/`
- Add screenshots to `docs/assets/screenshots/[category]/`
- Follow the [Style Guide](https://github.com/OpenCDMP/docs-internal/blob/main/STYLE_GUIDE.md) and [Screenshots Guide](screenshots.md)
- Test locally with `npm start`
- Check for broken links

#### Step 4: Test Your Changes

```bash
# Start dev server and review your changes
npm start

# Run TypeScript type checking
npm run typecheck

# Build production version (to catch build errors)
npm run build

# Serve production build
npm run serve
```

**Manual Testing Checklist**:
- [ ] Page renders correctly
- [ ] Images load and display properly
- [ ] Internal links work
- [ ] Code blocks have correct syntax highlighting
- [ ] Tables render properly
- [ ] Content is readable on mobile (resize browser)

#### Step 5: Commit Your Changes

```bash
# Add your changes
git add .

# Commit with descriptive message
git commit -m "docs: Add backup and recovery guide"

# Examples:
# git commit -m "docs: Add screenshots to admin getting started guide"
# git commit -m "fix: Correct broken links in integration docs"
# git commit -m "feat: Add troubleshooting guide for common errors"
```

**Commit Message Format**:
```
<type>: <description>

Types:
- docs: Documentation content changes
- fix: Fixing errors, broken links, typos
- feat: New documentation pages or sections
- style: Formatting, style guide updates
- refactor: Reorganizing content structure
- chore: Build process, dependencies
```

#### Step 6: Push and Create Pull Request

```bash
# Push your branch to GitHub
git push origin feature/your-contribution-name
```

Then:
1. Go to the GitHub repository
2. Click **Pull Request** (GitHub will usually show a prompt)
3. Fill in the PR template with:
   - **Title**: Clear description of changes
   - **Description**: What you changed and why
   - **Related Issues**: Reference any related issues (#123)
   - **Checklist**: Complete the PR checklist

**Pull Request Description Example**:
```markdown
## Description
Added a comprehensive guide for creating your first plan, including step-by-step instructions and troubleshooting tips.

## Changes
- Created `docs/user-guide/getting-started.md`
- Added screenshots for key steps
- Updated navigation in sidebar
- Added cross-references from getting started docs

## Checklist
- [x] Follows style guide
- [x] Tested locally (npm start)
- [x] No broken links
- [x] Screenshots optimized (if applicable)
- [x] Commit messages follow format
```

### 3. Reporting Documentation Issues

If you find a problem but can't fix it yourself:

1. Go to [GitHub Issues](https://github.com/OpenCDMP/docs-internal/issues)
2. Click **New Issue**
3. Choose the appropriate template (bug report, documentation request)
4. Provide details:
   - What's wrong or missing
   - Where (link to the page)
   - Suggested improvement (if you have one)

**Good Issue Example**:
```markdown
Title: Missing configuration example for multi-tenant setup

**Location**: https://docs.opencdmp.org/docs/getting-started/configuration/backend

**Issue**: The multi-tenancy configuration section lacks a complete example showing all required environment variables for a multi-tenant deployment.

**Suggested Fix**: Add a code block with a full example showing TENANT_* variables, database schema configuration, and tenant isolation settings.
```

## Documentation Structure

Understanding the documentation structure helps you place your contributions correctly:

```
docs/
├── getting-started/          # Installation, architecture, deployment
│   ├── architecture.md
│   ├── deployment/
│   │   ├── index.md (Initial Deployment)
│   │   └── upgrade.md (Upgrade Guide)
│   ├── deployment/           # Deployment guides
│   └── configuration/        # All configuration docs
├── user-guide/              # End-user guides
│   ├── plan.md
│   ├── description.md
│   └── export.md
├── admin-guide/           # Admin guides
│   ├── blueprint.md
│   ├── users.md
│   └── templates.md
├── guides/                   # Step-by-step walkthroughs
│   ├── your-first-plan.md
│   ├── admin-getting-started.md
│   └── common-workflows.md
├── developers/                 # Developer integration
│   ├── integration.md
│   └── api.md
├── optional-services/   # External service integrations
├── troubleshooting.md        # Problem-solving guide
├── visual-guide.md           # Architecture diagrams
└── contributing/             # This guide
```

### Adding a New Page

1. **Choose the right location** based on the content type
2. **Create the markdown file** with frontmatter:

```markdown
---
sidebar_position: 1
description: Brief description of the page
---

# Page Title

Content goes here...
```

3. **Add to sidebar** (if not using auto-generated sidebars):
   - Edit `sidebars.ts`
   - Add your page to the appropriate section

4. **Cross-reference** from related pages:

```markdown
See also: [Related Page](category/related-page.md)
```

## Writing Guidelines

### Voice and Tone

- **Formal and professional**: No contractions (use "do not" instead of "don't")
- **Direct and clear**: Get to the point quickly
- **Helpful and supportive**: Assume users want to succeed
- **Technically accurate**: Double-check facts and code examples

### Content Structure

Each page should have:

1. **Frontmatter**: Sidebar position and description
2. **Title (H1)**: Clear, descriptive title
3. **Introduction**: Brief overview (1-2 paragraphs)
4. **Body**: Main content with logical sections (H2, H3)
5. **Examples**: Code blocks, screenshots, or diagrams
6. **Cross-references**: Links to related documentation
7. **Optional**: See Also, Next Steps, Related Resources

### Code Examples

Always test code examples before adding them:

```bash
# Good: Include commands users can copy-paste
docker ps | grep opencdmp-backend

# Show expected output when helpful
# Output:
# abc123  opencdmp-backend:latest  Up 5 minutes  0.0.0.0:8081->8081/tcp
```

For configuration files:

```bash
# app.env
DB_URL=jdbc:postgresql://postgres:5432/opencdmp
DB_USER=opencdmp
DB_PASS=change-this-password  # ← Change this!

# Important: Never commit real passwords
```

### Links

Use absolute paths for internal links:

```markdown
✅ Good: [Backend Configuration](getting-started/configuration/backend/index.md)
❌ Bad:  [Backend Configuration](../../configuration/backend/index.md)
```

For external links, always use full URLs:

```markdown
[Docusaurus Documentation](https://docusaurus.io)
```

### Tables

Configuration tables must include a "Required" column:

| Variable | Required | Description | Default | Example |
|----------|----------|-------------|---------|---------|
| `DB_URL` | Yes | Database connection URL | None | `jdbc:postgresql://postgres:5432/opencdmp` |
| `DB_USER` | Yes | Database username | None | `opencdmp` |
| `LOGGING_LEVEL` | No | Logging verbosity | `INFO` | `DEBUG` |

Use footnotes for conditional requirements:

| Variable | Required | Description |
|----------|----------|-------------|
| `ELASTIC_ENABLED` | No | Enable Elasticsearch |
| `ELASTIC_HOST` | Yes* | Elasticsearch host |

\* Required if `ELASTIC_ENABLED=true`

## Review Process

After submitting a pull request:

1. **Automated Checks**: CI/CD will run build and type checks
2. **Documentation Review**: Maintainers will review for:
   - Accuracy and completeness
   - Style guide compliance
   - Grammar and clarity
   - Proper structure and formatting
3. **Feedback**: You may receive comments or change requests
4. **Approval**: Once approved, your PR will be merged
5. **Deployment**: Changes are automatically deployed to the documentation site

## Recognition

Contributors are recognized in:
- Git commit history
- Pull request acknowledgments
- Contributors list (if we create one)

## Getting Help

If you need help with your contribution:

1. **Documentation Questions**: Check existing docs first
2. **Technical Issues**: Open a GitHub issue
3. **General Questions**: Contact opencdmp at cite.gr

## Code of Conduct

Please be respectful and constructive in all interactions:

- Be welcoming to newcomers
- Be patient with questions
- Provide constructive feedback
- Focus on the content, not the person
- Respect differing viewpoints

## License

By contributing to this documentation, you agree that your contributions will be licensed under the same license as the project (EUPL-1.2).

---

## Quick Reference

### Common Tasks

**Fix a typo**:
1. Click "Edit this page" at bottom of the page
2. Make the change
3. Submit pull request

**Add a screenshot**:
1. Capture screenshot (follow [Screenshots Guide](screenshots.md))
2. Optimize and save to `docs/assets/screenshots/[category]/descriptive-name.png`
3. Add to markdown: `![Alt text](../assets/screenshots/category/file.png)`
4. Submit pull request

**Create a new page**:
1. Create `docs/category/new-page.md`
2. Add frontmatter (sidebar_position, description)
3. Write content following style guide
4. Test locally with `npm start`
5. Submit pull request

**Report an issue**:
1. Go to GitHub Issues
2. Click "New Issue"
3. Describe the problem with location and suggested fix
4. Submit

---

## Additional Resources

- [Style Guide](https://github.com/OpenCDMP/docs-internal/blob/main/STYLE_GUIDE.md) - Writing and formatting standards
- [Screenshots Guide](screenshots.md) - Screenshot capture and optimization
- [Docusaurus Documentation](https://docusaurus.io) - Platform documentation
- [Mermaid Documentation](https://mermaid.js.org/) - Diagram syntax

---

Thank you for contributing to OpenCDMP documentation! Your efforts help make the platform more accessible and easier to use for everyone. -->
