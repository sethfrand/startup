# Spreadsheet-like Finances

[My Notes](notes.md)

This application is a spreadsheet-like finances application. It allows users to create accounts, log in, and view their finances. The setup is simple
to understand. You can see everything at a glance. When a user logs in, they will be able to see the total you have spent in the month, your remaining budget, the 
categories that is accounting for most of your spending, as well as your monthly trend. From this page you will also be able to see a graph of your expenses over time as 
well as a breakdown of your spending by category.

> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

My web app brings the simplicity of a spreadsheet to personal finance. Users can log expenses, see totals, 
and track spending trends in real time, all in a familiar, table-based interface. With intuitive charts and category breakdowns, 
it’s easy to understand where your money goes each month and make smarter financial decisions. This web app is 
perfect for anyone looking to track their finances and stay on top of their spending without having a 
complex spreadsheet or complicated interface to work with.
### Design

![Design image](Снимок%20экрана%202026—01—10%20в%2012.39.58.png)

Here is a sequence diagram that shows how to people would interact 
the application to update and see their data.
```mermaid
sequenceDiagram
    actor Bob
    Bob->>Server: Login
    Server -->>Bob: Authenticated user
    Bob -->>Server: Update (expenses, budget, etc)
    Server -->>Bob: Updated data
```

### Key features

- Spreadsheet-like interface for easy data entry and viewing
- Automatic totals and summaries 
- visual spending insights
- category organizaton

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three main pages: Login, Dashboard, all expenses
- **CSS** - Spreadsheet-like styling, charts, styling that looks good on different screen sizes and uses good whitespace
- **React** - Provides login, update of graphical data, and charts
- **Service** - Backend service that handles data storage and authentication
- **DB/Login** - Stores user data and credentials in MongoDB
- **WebSocket** - live updates if user logs runs from multiple devices for collaborative use.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://financesheet.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Created a page for each part of the application.
- [x] **Proper HTML element usage** - I mostly used tables and buttons to show where things will be.
- [x] **Links** - All pages navigate to each other.
- [x] **Text** - All text is placeholder text.
- [x] **3rd party API placeholder** - I have a placeholder at the bottom of the overview page where the user will type the company to get the stock price.
- [x] **Images** - Added logo image to the login page.
- [x] **Login placeholder** - I used the same login template from Simon
- [x] **DB data placeholder** - This will be the expenses page
- [x] **WebSocket placeholder** - On the all sheets page, there is an option to share your sheet, the user can then share it with another user, they can both edit it at the same time.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
