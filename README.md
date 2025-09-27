# Assignment 2: Create a Personal Website
**Due Date:** September 29th, 11:55 PM

## Objective
In this assignment, you will create a personal website using HTML, CSS, and JavaScript. The goal is to build a professional online presence that includes content similar to what you would include in your resume. This website will serve as a portfolio to showcase your skills, education, experience, and interests while helping you get comfortable with front-end web development and version control using GitHub.

## Instructions

### Getting Started with Git and GitHub

#### GitHub CLI
**This is for those who want to use Git and GitHub in a more professional way.**

1. **Install Git:**
   - Download and install Git on your computer. Follow the installation instructions for your operating system [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

2. **Set Up Git Configuration:**
   - Once Git is installed, open the terminal or command prompt and set your username and email address. This ensures your commits are linked to your GitHub account:
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "youremail@example.com"
     ```
     
3. **Create a GitHub Account:**
   - If you don’t already have a GitHub account, create one [here](https://github.com/). It’s free and required for submitting your project.
   - You can use your SFU GitHub account. We recommend creating a personal GitHub account, as you will have permanent access to it.

4. **Create a repository for your personal website:**
   - You should name the repository `yourusername.github.io` so that when you type `yourusername.github.io` in your browser, it will display as a website. Pretty cool.
   - If you're using an SFU GitHub account, you can enable GitHub pages for that specific repository. [This link](https://docs.github.com/en/pages/quickstart) shows you how to create a webpage for a repository.

5. **Authenticate GitHub with Git:**
   Now you need to access your repository on your personal computer.
   - For security, GitHub now uses personal access tokens instead of passwords. To authenticate:
     - Go to your [GitHub account settings](https://github.com/settings/tokens) and generate a new Personal Access Token.
     - When prompted by Git to enter your credentials while pushing code, use this token instead of your GitHub password.
     - You can also set up [SSH authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) if you prefer.

5. **Clone Your Repository Locally:**
   - Once your repository is set up on GitHub and you have authenticated, use Git to clone it to your local machine:
     ```bash
     git clone https://github.com/YourUsername/YourUsername.github.io
     ```
     Example: My personal website is at `https://github.com/alireza116/alireza116.github.io`
   - This will create a local copy of your repository where you can build and edit your website files.


#### GitHub Desktop
**This is for those who want to use GitHub in a more convenient way.**

1. **Install GitHub Desktop**
   - Download and install GitHub Desktop from this [link](https://github.com/apps/desktop).

2. **Create a GitHub Account:**
   - If you don’t already have a GitHub account, create one [here](https://github.com/). It’s free and required for submitting your project.
   - You can use your SFU GitHub account. We recommend creating a personal GitHub account, as you will have permanent access to it.

3. **Create a repository for your personal website:**
   - You should name the repository `yourusername.github.io` so that when you type `yourusername.github.io` in your browser, it will display as a website. Pretty cool.
   - If you're using an SFU GitHub account, you can enable GitHub pages for that specific repository. [This link](https://docs.github.com/en/pages/quickstart) shows you how to create a webpage for a repository.

4. **Clone Your Repository Locally:**
   - Once your repository is set up on GitHub and you have set up GitHub Desktop, use it to clone the repository to your local machine:
     - [Here](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop), you can find a guide on how to begin working with GitHub desktop.
   - This will create a local copy of your repository where you can build and edit your website files.


### Creating Your Website

1. **Website Structure:**
   - Your website should have the following structure:
     ```bash
     A2-Personal-Website/
     ├── index.html
     ├── visualizations.html
     ├── style.css
     ├── main.js
     ├── vis.js
     └── README.md
     ```

2. **Suggested Content:**
   - **`index.html`:** This file should be the homepage of your website. It should include content similar to what you would include in your resume, but feel free to add your own flair. You can include the following:
     - **Personal introduction**: Your name, major, and a brief description of your interests.
     - **Education**: List your current and previous educational institutions and any relevant courses.
     - **Skills**: Highlight technical skills such as programming languages, software tools, etc.
     - **Experience**: Include work experience, internships, or relevant projects.
     - **Images**: Include images that represent you or your work.
     - **Contact information**: Provide a way for people to contact you, such as an email or LinkedIn profile.
     - A link to your GitHub profile or any other relevant portfolios.
   - **`style.css`:** This file should handle the styling of your webpage. Use CSS to make your website look clean and professional.
   - **`main.js`:** This file is mandatory and should be used for adding basic JavaScript interactivity (e.g., form validation or simple interactions).
   - **`visualizations.html`:** Create a new page where you can display your visualization portfolio. You will include:
       - One SVG version of the visualization you have chosen. You choose what to visualize; you'll get an extra score if you are creative (you may use the sketch diagram we asked for in the first session it's up to you).
       - Some creative SVG art using JS.
       - **JUST PUT YOUR VISUALIZATIONS ON THIS PAGE. USE JS FOR CREATING VISUALIZATIONS.**
   - **`vis.js`:** This file will contain the code for generating SVG drawings and visualization.
   - **`README.md`:** This file should explain the purpose of the website, including what technologies are used and how the site can be navigated.

3. **Expected Elements**:
  - A personal webpage.
  - A visualization page with two visualizations:
    - One SVG visualization.
    - Any creative SVG art.
  - You should organize the information on the website coherently and clearly.

### Submission Instructions

  - Upload the link to your GitHub repository and your personal website to the **Assignment 2** submission page on Canvas. **INCLUDE BOTH LINKS**.
  - You need a summary document in **PDF format** to write a brief report of what you have done, the challenges you faced, and the solutions you've devised for challenges.
  
### Grading Criteria
1. **Proper Formatting:**
   - Ensure that your files are named and structured as follows:
     - **`index.html`**
     - **`visualizations.html`**
     - **`style.css`**
     - **`main.js`**
     - **`vis.js`**
     - **`README.md`**

2. **Semantic Correctedness and Validity:**
   - Your codes will be assessed for errors using this [online tool](https://butlertron.ca/validator/). Make sure your submitted code doesn't have any errors. Password will be shared with you on Discord.
   - Make sure your HTML code is semantically correct.
   - Use responsive units for your CSS.

3. **Cohesive Responsive Design**
   - We don't evaluate your design in terms of being unique or distinct; however, we expect it to be cohesive and responsive.
   - To check your website on different screen sizes, you can use [this link](https://ah.link/rv).
---

## Tips:
- Start simple with your design! Use minimal HTML and CSS at first, and build up your page as you become more comfortable.
- Experiment with different styling options to enhance the look and feel of your website.
- If you’re new to GitHub and Git, use this [GitHub guide](https://docs.github.com/en/get-started/quickstart/set-up-git) for step-by-step instructions on how to set everything up.
- Keep your code clean and organized, and make frequent commits to track your progress!
- We will work on this together in class.
- [This link](https://github.com/SIAT-IAT-355/A2-Personal-Website/tree/main/22-sep-lab-example) contains the example Alireza walked you through in the lab session. You may use it as a beginning point.

---

## Learning resources:
-  For git, I highly recommend watching [Git and Github for Poets](https://www.youtube.com/watch?v=BCQHnlnPusY&list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV)
-  For Javascript, I highly recommend this online course [Code! Programming with p5.js for beginners](https://www.youtube.com/watch?v=HerCR8bw_GE&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA). This course is designed for artists, and will introduce you to a library that you can do a lot of cool stuff with!
-  No one really fully knows HTML and CSS. You are going to have to search and look up stuff. However, you can refer to [CSS](https://www.w3schools.com/css/) and , and [HTML](https://www.w3schools.com/html/default.asp) tutorials. Definitely look up stackoverflow, and ask questions from your AI assistant to learn how to do things. But **LEARN** from it. Do not just copy and paste.

---

## Additional Recommendations

- You can use [Project IDX](https://idx.dev/) for web development without needing to install anything locally. It provides an online integrated development environment (IDE) with Git and other tools pre-installed, making it easy to develop, preview, and push changes to GitHub directly from your browser.
- If you need help getting started, very simple website templates are available in the [linked repository](https://github.com/SIAT-IAT-355/A2-Personal-Website) to help you with the basic structure of the website.
