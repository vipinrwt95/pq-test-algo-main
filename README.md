## Prerequisites

Before you begin, ensure that the following software is installed on your system:

- Node.js (version 18.x)
- Yarn package manager. This project uses Yarn as its package manager. If Yarn is not installed on your system, you can install Yarn globally as an npm dependency using the following command:

```bash
npm install --global yarn
```

## Getting Started

Follow these steps to start working on this project:

1. Download this project as a ZIP file and unzip it to a location on your local computer.

2. Open your terminal and navigate to the directory where you unzipped the project. Before making any changes, commit the current state of the project:

```bash
git init
git add .
git commit -m "Initial commit"
```

3. Push this project to your GitHub account by creating a new repository on GitHub. Make sure to set the repository visibility to 'Public'. This will allow us to access and evaluate your solution.

4. On your local, create a new branch named "assessment" from "main" or "master" branch:

```bash
git checkout -b assessment
```

5. Install the necessary packages using Yarn:

```bash
yarn install
```

6. Launch the project on your local machine:

```bash
yarn start
```

This command will start the development server at `http://localhost:3000`.

7. Now, complete the following tasks:

### Task 1: Disable Redirection to `/login` Route

    1. Locate the code responsible for redirecting unauthenticated users to the `/login` route.
    2. (This is your task) Modify the code to disable this redirection.
    3. Verify that you can now visit `http://localhost:3000/links` without being redirected to the login page.

### Task 2: Fix Dropdown Background Color in Dark Mode

    1. Navigate to `http://localhost:3000/links`.
    2. Observe the header containing two dropdowns: "Select Company" and "Select Center."
    3. Switch to dark mode by clicking the bulb/moon icon on the top right.
    4. Notice the issue with the background color of the dropdowns in dark mode.
    5. (This is your task) Update the code to set their background color to #0f2642 for dark mode.
    6. Ensure that the fix applies to all instances of this dropdown component, not just the ones on this header.
    7. Verify that the dropdowns look correct in both light and dark modes.

### Task 3: Optimistically Update Name in Side-Nav

    1. Navigate to the `http://localhost:3000/account/basic-profile` page.
    2. Observe that the name is not displayed at the top of the left side-nav after the avatar.
    3. Fill in the first and last name fields on the page.
    4. Click the "Save Changes" button, this action will attempt to send a request using RTK query (note that it will fail as there's no connection to the real API).
    5. (This is your task) Implement an optimistic update to the cache using RTK query and the payload data. Undo the update if the API request fails.
    6. Refer to the gif expected-results.gif located at the root of the project for a demonstration, and consult the [RTK query documentation on optimistic updates](https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates) for guidance.

8. Once you've made your changes, stage and commit them:

```bash
git add .
git commit -am "Fix: Issues"
```

9. On your GitHub repository page, create a Pull Request from your "assessment" branch to the "main" or "master" branch.

10. Share the link to your repository's Pull Request with us.

We look forward to reviewing your work.
