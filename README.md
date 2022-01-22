# SIAMIK API

[![Repository version](https://img.shields.io/badge/version-0.3.0-brightred)](https://github.com/faisal01h/siamik-api)

An attempt to modernize UPN "Veteran" Jawa Timur's SIAMIK with REST-compliant interface. All data provided by this API is scraped from [SIAMIK](https://siamik.upnjatim.ac.id)'s _miserable_ webpage.

Due to captcha implementation at SIAMIK's login section, I cannot provide any data behind the login page.

## Usage

### API Endpoints
- GET `<host>:<port>/api/v1/pengumuman` : Show all pengumuman from 2022 pengumuman group (https://siamik.upnjatim.ac.id/html/siamik/umum.asp)
- GET `<host>:<port>/api/v1/kelas` : Show list of majors with links to each major's regular classes
- GET `<host>:<port>/api/v1/kelas/reguler?id=<id>` : Show list of classes from selected major. Requires query of string format which can be obtained from the endpoint prior to this one.
- GET `<host>:<port>/api/v1/kelas/reguler/detail?kelas=<kelas>&prodi=<prodi>&kode=<kode>` : Shows list of students within a class. Requires queries of string format which can be obtained from the endpoint prior to this one.

### Demo
[This (faisal01h/siamik-next)](https://github.com/faisal01h/siamik-next) repository contains a live demonstration of this API using Next.js frontend with client-side rendering.

You can also watch this code in action [here](https://api.siamik.services.faisalhnf.com/) or the usable one with the client-side [here](https://siamik.projects.faisalhnf.com).

## License
This repository uses the [MIT](https://mit-license.org/) License.

## Contributing to this project
You are free and in fact, encouraged to fork this project and better yet, contribute back to this project by making a pull request 😉