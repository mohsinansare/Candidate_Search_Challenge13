# Candidate Search Netlify Site

![license-badge](https://img.shields.io/badge/MIT_License-01a6ff)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [User story]
- [Acceptance Criteria]
- [Usage](#usage)
- [Generating Token](#how-to-generate-token)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Description

Use React to create a candidate search site that calls the GitHub API and displays a brief description about them. The user then can either dismiss or save this candidate which will then present the next candidate. This is repeated until there are no candidates to displays which alerts the user. Then, they can go to the Potential Candidates page to see a table of the candidates they saved. From there, they can narrow the list to find the best candidate by pressing the reject button. The pictures below show the candidate search and potential candidates pages, respectively.

![Website Homepage Screenshot](/images/homepage.png)

![Website Saved Table Screenshot](/images/saved-table.png)


## Installation

A device that can be connected to the internet and can connect to the browser is required. 

## User Story

AS AN employer

I WANT a candidate search application

SO THAT I can hire the best candidates

## Acceptance Criteria

GIVEN a candidate search application

WHEN the candidate search page loads

THEN the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company

WHEN I click the "+" button

THEN the candidate should be saved to the list of potential candidates and the next candidate's information should be displayed

WHEN I click the "-" button

THEN the next candidate's information should be displayed without saving the current candidate

WHEN there are no candidates available to review

THEN an appropriate message should be shown indicating no more candidates are available

WHEN the potential candidates page loads

THEN the user should see a list of previously saved potential candidates with their name, username, location, avatar, email, html_url, and company

WHEN the page reloads

THEN the list of potential candidates should persist and be available for viewing

WHEN there are no potential candidates

THEN an appropriate message should be displayed indicating no candidates have been accepted

WHEN I click the "-" button

THEN the next candidate's information should be displayed without saving the current candidate

## Usage

This project was used get a better understanding on how to use React; more specifically, how to use the react-router DOM library where when users want to go to a different page via the nav bar, it does not reload the page. In addition, I learned how to code in React using Typescript and learned more about how to use useState and useEffect hooks correctly.

## How to Contribute

Please contact me before contributing to this project. My contact info is located in the Questions section.

## Tests

The following link goes to the deployed project on Netlify: [Candidate Search](https://arjun-candidate-search.netlify.app/).

## License

This project is covered under the MIT license.

---

## Questions

GitHub username: [apatel62](https://github.com/apatel62) <br>
