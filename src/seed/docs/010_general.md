# Groke

## Project structure

-   **/components/.js**: Handle component logic (API calls, event definition, state handling, etc.)
-   **/components/.view.js**: Handle component rendering (html)
-   /styles: Handle component dedicated styles
-   /public/resources: Stores images, videos and static assets
-   /settings.js: Application settings attributes
-   /seed: Autogenerated files produced by seed-builder: It includes connection management & cache handling
    >   *These files are *read-only*, modifiable only through [seed-builder](./110-seed-builder.md) *
    
## Development

### Project variables

- To change project variables (server_url, app_url) adjust `settings.js`

- To modify environment variables of docker (e.g. IS_PROD) adjust `bin/docker/docker.env` and then execute `bin/setup`.
    >   In case of require native modifications, check O.S. specification (e.g. For ubuntu 18.04 modify `~/.bash_profile`)

### Testing

-   Show server logs `bin/logs <?Max_Lines>`
-   Test use cases `bin/test`
-   Review code quality `bin/review`
    >   To run review command, install [Codacy CLI](https://github.com/codacy/codacy-analysis-cli)
-   Generate code coverage report `bin/coverage`
    
### Docker

-   Open docker terminal (ubuntu bash) `bin/terminal`
-   Clean unused docker resources `bin/clean`

## Other resources

-   [Components docs](020_components.md)
-   [Views docs](030_views.md)
-   [Seed builder](110_seed_builder.md)
-   [Seed commons - API](120_seed_commons_api.md)
-   [Seed commons - GQL](130_seed_commons_gql.md)
-   [Seed commons - Helpers](140_seed_commons_helpers.md)
-   [Deployment - Ubuntu](220_ubuntu.md)