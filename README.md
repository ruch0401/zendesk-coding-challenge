# Zendesk Coding Challenge

## Working Video

![Zendesk Coding Challenge Working GIF](resources/zendesk-coding-challenge.gif)

## Instructions

- Create a directory on your local machine named - zendesk-coding-challenge
- Run the following command -

```
git clone https://github.com/ruch0401/zendesk-coding-challenge.git
```

Prerequisites

```
Node JS
Zendesk Developer Account
```

- Download nodejs using https://nodejs.org/en/download/
- Download and update npm to the latest version using `npm install -g npm`
- Once downloaded and installed, check the versions of the downloaded modules using the following commands (run in the terminal)

```
node -v
npm -v
```

The output should be something like this -

| ![node-npm-version](resources/node-npm-version.png "Checking node and npm version") |
| :---------------------------------------------------------------------------------: |
|                        <b>Checking node and npm versions</b>                        |

- Navigate to the `zendesk-coding-challenge` directory and open a terminal window here. The following steps have to be performed in this terminal window.

```
cd zendesk-coding-challenge/
```

- Run the following commmand. This will install all the dependencies present in the `package.json` file.

```
npm install
```

- Once done, you need to create a new file named `.env` in the `zendesk-coding-challenge` directory which we had created previously. Enter the following content in the file, save it and close it.

```
UNAME=<email-id-here>
PWORD=<password-here>
```

```
Note: The .env file allows abstraction of the username, password and other sensitive information so that we are not needed to upload these details to version control. These 'environment-variables' can be accessed using process.env.KEY_NAME, where KEY_NAME is the environment-variable name that needs to be used.
```

- Now, you have to start the server. In the terminal, run the following command

```
npm start
```

This will start the local server on port 3000

- Now, open the `index.html` file on your browser, preferrably, Google Chrome.

## Features

- You should be able to see a list view of the tickets available in your Zendesk's account

Update: Please note that now, the tickets can be fetched after a button click.

| ![all-ticket-list](resources/all-ticket-list.png "List of all tickets as an accordion") |
| :-------------------------------------------------------------------------------------: |
|                       <b>List of all tickets as an accordion</b>                        |

- If the number of tickets returned by the API is greater than 25, then the response is paginated, i.e. a single page will only have a list of 25 tickets

| ![pagination](resources/pagination.png "pagination") |
| :--------------------------------------------------: |
|   <b>Paginated result (when ticket count > 25)</b>   |

- You can see the count of the total number of tickets and the total tickets displayed on that page on the top right corner of the screen

| ![count-display](resources/count-display.png "count-display") |
| :-----------------------------------------------------------: |
|                  <b>Ticket Counter Stats</b>                  |

- You can expand any accordion to view some critical information about a ticket.

| ![single-ticket-table](resources/single-ticket-table.png "single-ticket-table") |
| :-----------------------------------------------------------------------------: |
|                <b>Critical Information about a single ticket</b>                |

- In case of any error, the error message will be displayed on the webpage below the heading.

| ![error-handling](resources/error-handling.png "error-handling") |
| :--------------------------------------------------------------: |
|                      <b>Error Handling</b>                       |

- To enable a holistic user experience, I have also added a 'search' functionality and a 'create-ticket' functionality. Please find the working GIF [here](#working-video)

## Tests

Framework Used -

```
Jest
Supertest
```

- These would have been downlaoded automatically when you had previously run `npm install`

- Navigate to the `zendesk-coding-challenge` directory and run -

```
npm test
```

This will run the unit tests. As of now, there is one unit test which checks whether the response that is returned by the API has a key called `tags` and whether it is an array of size 3

|  ![unit-test](resources/unit-test.png "unit-test")  |
| :-------------------------------------------------: |
| <b>Unit Test using Jest and Supertest Framework</b> |

- More tests are being continuously added.
