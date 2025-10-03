---
sidebar_position: 6
description: Comprehensive troubleshooting guide for common OpenCDMP issues
---

# Troubleshooting Guide

This guide helps you diagnose and resolve common issues in OpenCDMP. Issues are organized by category for quick navigation.

:::tip Quick Search
Use Ctrl+F (or Cmd+F on Mac) to search for specific error messages or symptoms on this page.
:::

---

## How to Use This Guide

1. **Identify the symptom** - What is not working?
2. **Find the relevant section** below
3. **Try the suggested solutions** in order
4. **Check logs** if the issue persists
5. **Contact support** if unresolved (see bottom of page)

---

## Quick Diagnostic Questions

Before diving into specific issues, answer these questions:

- 🔄 **Have you tried refreshing the page?**
- 🚪 **Have you tried logging out and back in?**
- 🌐 **Are you using a supported browser?** (Chrome, Firefox, Edge, Safari)
- 📶 **Is your internet connection stable?**
- 🕐 **Did this work before?** (If yes, what changed?)
- 👥 **Can others reproduce the issue?**

---

## Table of Contents

### User Issues
- [Login and Authentication Problems](#login-and-authentication-problems)
- [Cannot Create or Save Plans](#cannot-create-or-save-plans)
- [Cannot See My Plans](#cannot-see-my-plans)
- [Collaboration and Sharing Issues](#collaboration-and-sharing-issues)
- [Export Problems](#export-problems)
- [Upload and File Issues](#upload-and-file-issues)
- [Notification Issues](#notification-issues)

### Administrator Issues
- [User Management Problems](#user-management-problems)
- [Blueprint or Template Not Working](#blueprint-or-template-not-working)
- [Integration Issues](#integration-issues)
- [Performance Problems](#performance-problems)

### System Issues
- [Services Not Starting](#services-not-starting)
- [Database Connection Errors](#database-connection-errors)
- [Network and Connectivity](#network-and-connectivity)

---

## Login and Authentication Problems

### Issue: Cannot Log In - "Invalid Credentials"

**Symptoms:**
- Error message: "Invalid username or password"
- Login button does nothing
- Redirected back to login after entering credentials

**Solutions:**

1. **Verify Credentials**
   - Check for typos (password is case-sensitive)
   - Ensure Caps Lock is OFF
   - Try copying/pasting password from password manager

2. **Password Reset**
   - Click "Forgot Password" link
   - Check email (including spam folder) for reset link
   - Reset link expires after 24 hours - request new one if needed

3. **Account Status**
   - Verify your account is active (contact admin)
   - Check if account requires activation email
   - Ensure you're not locked out after multiple failed attempts

4. **SSO Issues**
   - If using Single Sign-On, verify SSO provider is working
   - Try logging into SSO provider directly
   - Clear browser cookies and try again

**Still not working?**
- Contact your OpenCDMP administrator
- Provide: username (not password!), error message, browser used

---

### Issue: Redirected to Keycloak Login Page in Loop

**Symptoms:**
- Login successful but redirected back to Keycloak
- Infinite redirect loop
- Browser shows "too many redirects" error

**Solutions:**

1. **Clear Browser Data**
   ```
   Chrome: Settings → Privacy → Clear browsing data
   Firefox: Settings → Privacy → Clear Data
   ```
   - Select: Cookies and cached files
   - Time range: All time
   - Restart browser

2. **Check Keycloak Configuration** (Admin)
   - Verify Keycloak `IDP_ISSUER_URI` matches realm URL exactly
   - Check `CORS_ALLOWED_ORIGIN` includes frontend URL
   - Ensure Keycloak client redirect URIs include OpenCDMP URL

3. **Browser Issues**
   - Disable browser extensions (especially ad blockers)
   - Try incognito/private browsing mode
   - Try different browser

### Issue: "Session Expired" or "Unauthorized" Errors

**Symptoms:**
- Error message: "Your session has expired"
- Status: 401 Unauthorized
- Randomly logged out

**Solutions:**

1. **Immediate Fix**
   - Log out completely
   - Close all browser tabs
   - Log back in

2. **Prevent Recurrence**
   - Don't leave OpenCDMP idle for long periods
   - Save work frequently
   - Use browser's "remember me" feature

3. **Administrator Settings** (if too frequent)
   - Increase Keycloak session timeout
   - Check token expiration settings
   - Review session management configuration

**Keycloak Session Settings:**
```
Keycloak Admin Console → Realm Settings → Tokens
- SSO Session Idle: 30 minutes
- SSO Session Max: 10 hours
- Access Token Lifespan: 5 minutes 
```

---

## Cannot Create or Save Plans

### Issue: "Required Field" Errors Preventing Save

**Symptoms:**
- Cannot save plan
- Error: "Please fill in all required fields"
- Red indicators on form fields

**Solutions:**

1. **Identify Missing Fields**
   - Look for fields marked with red asterisk (*)
   - Scroll through all sections - missing fields may be in collapsed sections
   - Check progress bar for incomplete sections

2. **Field-Specific Issues**
   - **Date fields**: Ensure valid date format (YYYY-MM-DD or as specified)
   - **Dropdown fields**: Select an option, don't leave as "Select..."
   - **Email fields**: Enter valid email format (user@domain.com)
   - **Number fields**: Enter numbers only (no text)

3. **Validation Errors**
   - Read error messages carefully - they indicate what's wrong
   - Fix validation errors one by one
   - Some fields depend on others - fill in correct order

4. **Browser Auto-fill Issues**
   - Auto-fill may not trigger validation
   - Manually click in auto-filled fields to trigger validation
   - Or manually re-type the values

**Still can't save?**
- Take screenshots of errors and contact support

---

### Issue: Changes Not Saved / Lost Work

**Symptoms:**
- Edited plan but changes disappeared
- "Save" button clicked but changes lost
- Plan reverted to previous state

**Solutions:**

1. **Save Frequently**
   - Look for confirmation message after saving

2. **Network Issues**
   - Check internet connection
   - Look for "offline" or "connection lost" messages
   - If connection lost, copy your work to clipboard before refreshing

3. **Concurrent Editing**
   - If multiple people edit simultaneously, last save wins
   - Use sections to avoid conflicts (assign sections to different users)
   - Coordinate editing times with collaborators

4. **Browser Issues**
   - Don't close tab immediately after clicking "Save"
   - Wait for save confirmation
   - Check browser console for errors (F12 → Console tab)

**Preventing Data Loss:**
- ✅ Save after every major section
- ✅ Copy long text to clipboard before pasting into forms
- ✅ Draft long text in separate document first
- ✅ Use section-level permissions to avoid conflicts

---

### Issue: "Access Denied" or "Insufficient Permissions"

**Symptoms:**
- Error: "You do not have permission to perform this action"
- Status: 403 Forbidden
- Cannot edit plan you own

**Solutions:**

1. **Check Your Role**
   - View plan details - what is your role?
   - Owner: Full access
   - Contributor: Can edit descriptions into assigned sections
   - Viewer: Read-only
   - Reviewer: Can add annotations only

2. **Plan Status**
   - Draft: Owners/Contributors can edit
   - Finalized: Usually read-only
   - Solution: Change status back to Draft (if you have permission)

3. **Section Permissions**
   - You may only have access to specific sections
   - Try editing sections assigned to you
   - Contact plan owner to adjust permissions

4. **Account Issues**
   - Verify you're logged into correct account
   - Check if account is still active
   - Contact administrator to verify permissions

---

## Cannot See My Plans

### Issue: Plans List is Empty

**Symptoms:**
- "My Plans" page shows no plans
- Plans you created are missing
- Recently created plan not visible

**Solutions:**

1. **Check Filters**
   - Look for filter controls above plan list
   - Reset all filters:
     - Status: Show all
     - Blueprint type: All
   - Clear search box if present

2. **Check Sorting**
   - Plans might be sorted differently
   - Try sorting by: "Modified", "Label", "Status"

3. **Verify Plan Exists**
   - Ask collaborator to check if they can see it
   - Administrator can search all plans

4. **Cache Issues**
   - Refresh page (Ctrl+R or Cmd+R)
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache

5. **Tenant/Organization Filter**
   - If multi-tenant: verify you're viewing correct tenant
   - Switch tenant dropdown if available

---

### Issue: Search Returns No Results

**Symptoms:**
- Search for plan title returns nothing
- Keyword search doesn't work
- All plans missing after search

**Solutions:**

1. **Check Search Syntax**
   - Try partial words ("Marine" instead of "Marine Biology Project")
   - Try different keywords
   - Remove special characters

2. **Elasticsearch Issues** (Administrator)
   - Verify Elasticsearch is running
   - Check if plans are indexed
   - Rebuild search index

3. **Clear Search and Filters**
   - Remove search terms
   - Reset all filters
   - Refresh page

---

## Collaboration and Sharing Issues

### Issue: Collaborator Invitation Not Received

**Symptoms:**
- Invited user did not receive email
- Email invitation link doesn't work
- User says they never got invitation

**Solutions:**

1. **Check Email Address**
   - Verify email address is correct (typos common!)
   - Check for extra spaces
   - Case-sensitive email systems are rare but possible

2. **Check Spam/Junk Folder**
   - Email may be filtered as spam
   - Add opencdmp@your-domain.com to contacts
   - Check quarantine if corporate email

3. **Resend Invitation**
   - Resend invitation Or remove and re-add user

4. **Email Service Issues** (Administrator)
   - Check notification service is running
   - Verify SMTP configuration
   - Check email service logs
   - Test with different email provider (Gmail, Outlook, etc.)

---

### Issue: Collaborator Cannot Edit Sections

**Symptoms:**
- Collaborator added but cannot edit
- Sections are read-only for collaborator
- "You do not have permission" error

**Solutions:**

1. **Verify Collaborator Role**
   - Check user's role

2. **Check Section Assignment**
   - Some setups require explicit section assignment
   - Assign specific sections to collaborator
   - Or grant "All sections" access

3. **Plan Status**
   - Finalized plans cannot be edit

4. **Collaborator Must Accept Invitation**
   - They must click link in email
   - And log in to OpenCDMP
   - Then they'll see plan

---

## Export Problems

### Issue: Exported PDF/DOCX is Incomplete

**Symptoms:**
- Exported file missing sections
- Content truncated
- Formatting broken

**Solutions:**

1. **Verify Plan is Complete**
   - Ensure all sections saved before export
   - Check progress bar shows 100%
   - Save plan, then export

2. **Try Different Format**
   - If PDF broken, try DOCX
   - If DOCX broken, try PDF or JSON
   - Different formats use different converters

3. **File Size Issues**
   - Very large plans may have issues
   - Try exporting individual sections
   - Reduce image sizes if possible

4. **File Transformer Service Issues** (Administrator)
   - Check file transformer service is running
   - Verify PDF converter is configured
   - Check service logs for errors

---

## Upload and File Issues

### Issue: Cannot Upload Files

**Symptoms:**
- Upload button doesn't work
- File selection dialog doesn't open
- Upload fails with error

**Solutions:**

1. **File Size Limit**
   - Check file size (typically 10 MB limit)
   - Compress large files
   - Upload to external storage and link instead

2. **File Type Restrictions**
   - Some file types may be blocked
   - Rename .exe or .bat files to .txt (if appropriate)
   - Check allowed file types in documentation

3. **Browser Issues**
   - Clear browser cache
   - Try different browser
   - Disable extensions

4. **Network Timeout**
   - Large files may timeout on slow connections
   - Try faster/more stable internet
   - Upload during off-peak hours

---


## Notification Issues

### Issue: Not Receiving Email Notifications

**Symptoms:**
- No emails for plan invitations
- No status change notifications
- No reminder emails

**Solutions:**

1. **Check User Email Preferences**
   - Update email address if changed

2. **Check Spam Folder**
   - Emails may be filtered
   - Add sender to safe senders list

3. **Administrator Checks:**
   - Verify notification service is running
   - Check SMTP configuration
   - Test email delivery manually

---

## User Management Problems

### Issue: Cannot Add Users (Administrator)

**Symptoms:**
- "Add User" button disabled or missing
- Email invitation fails
- Error creating user account

**Solutions:**

1. **Check Administrator Permissions**
   - Verify you have Tenant Admin or Installation Admin role
   - Some actions require specific admin level

2. **Email Already Exists**
   - User may already have account
   - Search existing users before adding
   - Users can belong to multiple tenants

3. **Keycloak Integration Issues**
   - If SSO: user must exist in Keycloak first
   - Create user in Keycloak, then assign to OpenCDMP
   - Verify Keycloak API connection

<!-- accounting disabled -->
<!-- 4. **Usage Limits**
   - Check if user quota reached
   - Admin → Usage Limits
   - Increase limits or remove inactive users -->

---

## Blueprint or Template Not Working

### Issue: Blueprint Not Appearing for Users

**Symptoms:**
- Users cannot see/select blueprint
- Blueprint exists but not in list
- "No blueprints available" message

**Solutions (Administrator):**

1. **Check Blueprint Status**
   - Blueprint must be **Finalized** (not Draft)

2. **Check Permissions**
   - Verify blueprint permissions
   - Ensure appropriate user groups have access
   - Check tenant restrictions

3. **Version Issues**
   - Multiple versions may exist

---

### Issue: Template Fields Not Displaying

**Symptoms:**
- Description template appears empty
- Fields missing in template
- Template not loading

**Solutions (Administrator):**

1. **Check Template Status**
   - Template must be Finalized
   - Verify template has fields defined

2. **Blueprint Compatibility**
   - Ensure template is compatible with blueprint
   - Check template type matches section requirements

3. **Cache Issues**
   - Clear application cache
   - Restart backend service
   - Users should clear browser cache

---

## Integration Issues

### Issue: Zenodo/Repository Deposit Fails

**Symptoms:**
- Deposit button does nothing
- Error: "Deposit failed"
- No DOI received

**Solutions:**

1. **Check Plan Status**
   - Plan must be Finalized

2. **Authentication Issues** (Administrator)
   - Verify Zenodo API token is valid
   - Check token hasn't expired
   - Ensure correct permissions granted

3. **Metadata Requirements**
   - Repository may require specific metadata
   - Check deposit service configuration
   - Verify all mapped fields are filled

4. **Network/Service Issues**
   - Repository may be temporarily unavailable
   - Try again later
   - Check repository status page

---

## Performance Problems

### Issue: OpenCDMP is Slow

**Symptoms:**
- Pages take long to load
- Actions delayed (save, export, search)
- Timeout errors

**Solutions (Users):**

1. **Browser-Level Fixes**
   - Close unnecessary browser tabs
   - Clear browser cache and cookies
   - Disable unnecessary extensions
   - Update browser to latest version

2. **Network Issues**
   - Check internet connection speed
   - Try different network (WiFi vs. wired)
   - Use VPN if corporate firewall slow

3. **Plan-Specific Issues**
   - Very large plans may be slow

**Solutions (Administrator):**

1. **Check Server Resources**
   ```bash
   # CPU and memory usage
   docker stats

   # Disk space
   df -h
   ```

2. **Database Performance**

---

## Services Not Starting

### Issue: Backend Service Won't Start

**Symptoms:**
- Container exits immediately after start
- Error logs show configuration issues
- Service health check fails

**Solutions (Administrator):**

1. **Check Logs**

2. **Common Issues:**

   **Database Connection Failed:**
   ```
   Error: "Could not connect to database"
   ```
   - Verify PostgreSQL is running
   - Check `DB_URL`, `DB_USER`, `DB_PASS` correct
   - Test database connection manually

   **Keycloak Unreachable:**
   ```
   Error: "Unable to fetch OIDC configuration"
   ```
   - Verify Keycloak is running
   - Check `IDP_ISSUER_URI` is correct and accessible
   - Ensure network between services

   **Missing Environment Variables:**
   ```
   Error: "Required environment variable not set"
   ```
   - Check all required vars in `.env` file
   - Verify `.env` file is in correct location
   - Ensure Docker Compose loads `.env` file

3. **Port Conflicts**
   - Check if port already in use
   - Change port mapping in docker-compose.yml

4. **Permission Issues**
   - Check file permissions
   - Ensure volumes are writable

---

## Database Connection Errors

### Issue: "Connection Refused" or "Connection Timeout"

**Solutions (Administrator):**

1. **Verify PostgreSQL Running**

2. **Test Connection Manually**

3. **Check Network Configuration**

4. **Database Credentials**

---

## Network and Connectivity

### Issue: CORS Errors

**Symptoms:**
- Browser console shows CORS error
- Frontend cannot reach backend API
- Status: "Network Error" or "CORS policy blocked"

**Solutions (Administrator):**

1. **Check CORS Configuration**
   ```bash
   # Backend configuration
   CORS_ALLOWED_ORIGIN=http://localhost:4200
   ```
   - Must match frontend URL exactly
   - Include protocol (http:// or https://)
   - Include port if non-standard

2. **Browser Dev Tools**
   - Check exact error message in console (F12)
   - Verify request URL is correct
   - Check response headers include Access-Control-Allow-Origin

3. **Reverse Proxy**
   - If using nginx/Apache, ensure CORS headers configured
   - Check reverse proxy passes headers correctly

---

## Getting More Help

### Collecting Diagnostic Information

Before contacting support, gather this information:

**User Information:**
- Your username (NOT password)
- Your role (Owner, Contributor, Viewer, Admin)
- Exact error message (screenshot helpful)
- Steps to reproduce the issue

**System Information:**
- Browser and version (Help → About in browser)
- Operating system
- When did issue start?
- Does it happen for everyone or just you?

**For Administrators:**
- OpenCDMP version
- Relevant log snippets (sanitize sensitive data!)
- Configuration file excerpts (redact secrets!)


### Browser Console Errors

1. Open browser developer tools (F12)
2. Go to **Console** tab
3. Reproduce the issue
4. Look for red error messages
5. Take screenshot or copy error text

### Contact Support

- **GitHub Issues**: [https://github.com/OpenCDMP/OpenCDMP/issues](https://github.com/OpenCDMP/OpenCDMP/issues)
- **Community Forum**: Check your instance's support information
- **Administrator**: Contact your local OpenCDMP admin first
- **Email**: opencdmp@cite.gr (for general inquiries)

---

## Related Documentation

- [Deployment Guide](/docs/getting-started/deployment/index.md) - Initial setup and deployment

---

:::tip Prevention is Better Than Cure
Many issues can be avoided by:
- Keeping OpenCDMP and dependencies up-to-date
- Regular backups of database and configuration
- Monitoring system resources and logs
- Testing changes in staging environment first
:::
