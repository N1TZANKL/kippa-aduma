<p align="center"><img src="https://raw.githubusercontent.com/N1TZANKL/kippa-aduma/master/public/favicon.ico" style="width: 200px; border-radius: 50%; background-color: whitesmoke" alt="Kippa-Aduma"></p>

# Kippa Aduma

Kippa Aduma is a web application, developed originally for Red Teams (but suitable to other types of teams as well), to keep track of their progress and achievements throughout their campaign in one place.

## Table of Contents

-   [Key Features](#key-features)
-   [Stack](#stack)
-   [Setup](#setup)
-   [Contributing](#contributing)
-   [Roadmap](#roadmap)

## Key Features

-   **Operation feed** - write posts to describe any important step, achievement, etc. so that everyone can keep track of what's happened and be in sync.
-   **Task boards** - ability to create, edit and delete tasks. Assign tasks to teammates and follow up on their progress.
-   **File manager / viewer** - ability to upload, download and preview files related to the campaign.
-   **Credentials manager** - view previously-achieved credentials, add new ones and export as CSV.
-   **General chat room** for quick questions between teammates
-   **Campaign overview and quick actions** through the home page.

## Stack

-   Next (Universal/server-side rendered React)
-   React (UI library / frontend)
-   NodeJS (Web server / backend)
-   Material UI (Design system)
-   Mongo (Database)
-   Docker (deployment)

## Setup

Refer to the _[setup guide](setup-guide.md)_ for information about how to run the project locally or deploy with docker.

## Contributing

Feedback is very welcome! Open issues for any idea, bug report or feature request.

Pull requests are also welcome, although my response could be late, as I'm not sure how much time I'll have to maintain this project.

Special thanks to [Lior](https://github.com/Git-Lior) and [Nitzan Bueno](https://github.com/nitzanbueno) for their contribution and support! And thanks to all the other great people that helped along the way, one way or another :)

## Roadmap

-   [ ] Online demo
-   [ ] HTTPS support with kubernetes
-   [ ] Global state management with Redux
-   [ ] Export campaign data to report
