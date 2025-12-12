# Git Push with SSH Key - Step by Step Guide

## Step 1: Check if You Already Have an SSH Key

Open your terminal and run:

```bash
ls -al ~/.ssh
```

Look for files named:
- `id_rsa` and `id_rsa.pub` (RSA key)
- `id_ed25519` and `id_ed25519.pub` (Ed25519 key - recommended)

If you see these files, skip to **Step 3**.

## Step 2: Generate a New SSH Key

If you don't have an SSH key, generate one:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**Or** if your system doesn't support Ed25519:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**When prompted:**
- **File location**: Press Enter to accept default (`~/.ssh/id_ed25519`)
- **Passphrase**: Enter a secure passphrase (or press Enter for no passphrase)

## Step 3: Start the SSH Agent

```bash
eval "$(ssh-agent -s)"
```

This should output something like: `Agent pid 12345`

## Step 4: Add Your SSH Key to the Agent

```bash
ssh-add ~/.ssh/id_ed25519
```

**Or** if you used RSA:

```bash
ssh-add ~/.ssh/id_rsa
```

## Step 5: Copy Your Public SSH Key

Display your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

**Or** for RSA:

```bash
cat ~/.ssh/id_rsa.pub
```

**Copy the entire output** (it starts with `ssh-ed25519` or `ssh-rsa` and ends with your email)

## Step 6: Add SSH Key to GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click your profile picture (top right) → **Settings**
3. Click **SSH and GPG keys** (left sidebar)
4. Click **New SSH key** (green button)
5. Fill in:
   - **Title**: Give it a name (e.g., "My MacBook Pro")
   - **Key**: Paste your public key (from Step 5)
6. Click **Add SSH key**
7. Enter your GitHub password if prompted

## Step 7: Test Your SSH Connection

Test the connection to GitHub:

```bash
ssh -T git@github.com
```

**First time:** You'll see:
```
The authenticity of host 'github.com' can't be established...
Are you sure you want to continue connecting (yes/no)?
```
Type `yes` and press Enter.

**Success message:**
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 8: Navigate to Your Project

```bash
cd /Users/silverfang/Documents/limitless
```

## Step 9: Initialize Git (if not already done)

Check if git is initialized:

```bash
git status
```

If you see "not a git repository", initialize it:

```bash
git init
```

## Step 10: Add Your Files

```bash
# Add all files
git add .

# Or add specific files
git add file1.txt file2.txt
```

## Step 11: Make Your First Commit

```bash
git commit -m "Initial commit: EWCI Dashboard with Football API integration"
```

## Step 12: Add Remote Repository

### Option A: Create New Repository on GitHub First

1. Go to [GitHub.com](https://github.com)
2. Click **+** (top right) → **New repository**
3. Name it (e.g., `limitless-ewci`)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

### Option B: Add Remote URL

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

**Example:**
```bash
git remote add origin git@github.com:silverfang/limitless-ewci.git
```

### Check Remote:

```bash
git remote -v
```

Should show:
```
origin  git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git (fetch)
origin  git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git (push)
```

## Step 13: Push to GitHub

```bash
# First push (set upstream)
git push -u origin main
```

**Or** if your default branch is `master`:

```bash
git push -u origin master
```

**If you get an error about branch name**, check your branch:

```bash
git branch
```

If it shows `master`, rename it:

```bash
git branch -M main
git push -u origin main
```

## Step 14: Verify Push

Go to your GitHub repository page - you should see all your files!

## Future Pushes

After the first push, you can simply use:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

### Error: "Permission denied (publickey)"

**Solution:**
1. Make sure you added the SSH key to GitHub (Step 6)
2. Test connection: `ssh -T git@github.com`
3. Check key is loaded: `ssh-add -l`

### Error: "Could not read from remote repository"

**Solution:**
1. Check remote URL: `git remote -v`
2. Make sure it uses SSH (`git@github.com:...`) not HTTPS (`https://github.com/...`)
3. If it's HTTPS, change it:
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

### Error: "Repository not found"

**Solution:**
1. Make sure the repository exists on GitHub
2. Check the repository name and username are correct
3. Make sure you have access to the repository

### Error: "Branch 'main' has no upstream branch"

**Solution:**
```bash
git push -u origin main
```

The `-u` flag sets the upstream branch.

## Quick Reference Commands

```bash
# Check SSH key
ls -al ~/.ssh

# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Test GitHub connection
ssh -T git@github.com

# Check git status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push -u origin main
```

---

**That's it!** You're now set up to push to GitHub using SSH keys. 🔐✨



