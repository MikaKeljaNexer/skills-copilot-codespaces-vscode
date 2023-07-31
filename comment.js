// Create web server
// ----------------

// Load modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Create web server
const app = express();
const port = process.env.PORT || 3000;

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Listen for POST requests to /comment
app.post('/comment', (req, res) => {
  res.sendStatus(200);
  const { comment, issueNumber, repoOwner, repoName } = req.body;

  // Create the comment
  octokit.issues.createComment({
    owner: repoOwner,
    repo: repoName,
    issue_number: issueNumber,
    body: comment,
  });
});

// Listen for POST requests to /comment
app.post('/merge', (req, res) => {
  res.sendStatus(200);
  const { prNumber, repoOwner, repoName } = req.body;

  // Merge the PR
  octokit.pulls.merge({
    owner: repoOwner,
    repo: repoName,
    pull_number: prNumber,
  });
});

// Listen for POST requests to /comment
app.post('/close', (req, res) => {
  res.sendStatus(200);
  const { prNumber, repoOwner, repoName } = req.body;

  // Close the PR
  octokit.pulls.update({
    owner: repoOwner,
    repo: repoName,
    pull_number: prNumber,
    state: 'closed',
  });
});

// Listen for POST requests to /comment
app.post('/delete', (req, res) => {
  res.sendStatus(200);
  const { issueNumber, repoOwner, repoName } = req.body;

  // Close the PR
  octokit.issues.delete({
    owner: repoOwner,
    repo: repoName,
    issue_number: issueNumber,
  });
});

// Listen for POST requests to /comment
app.post('/status', (req, res) => {
  res.sendStatus(200);
  const { status, repoOwner, repoName, sha } = req.body;

  // Create the comment
  octokit