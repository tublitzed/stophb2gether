# StopHB2gether

Old site.

# scripts

- `npm run w`
- `npm run lint`

## DB

Using Neon as of Oct 2026.

## seeding prod in production.

The seeds file has everything. Essentially this is a static site that loads content from the DB, and it can be re-seeded anywhere.

To seed into Neon, grab the connection string from the Neon web console (without connection pooler) then:

* Open `config/application.yml` and uncomment the `DATABASE_URL`: use the Neon connection string.
* Then run `RAILS_ENV=production bin/rails db:schema:load db:seed`

## Hosting

Using Railway as of Oct 2026. Deployed via the Railway console.

To deploy a specific feature branch, run `railway link` to make sure you're connected to the right project, then `railway up` to deploy the current branch.



# Running locally:
* Use rvm to install the correct ruby version
* `bundle install`
* `mkdir -p /Users/tublitzed/GIT/stophb2gether/shared/sockets` if it doesn't exist already (used to share ruby config across app)
* `mkdir -p /Users/tublitzed/GIT/stophb2gether/shared/pids`
* `mkdir -p /Users/tublitzed/GIT/stophb2gether/shared/log`
* `rails s -b 0.0.0.0 -p 3000`

## Assets
* `rake assets:clobber` - remove assets

## Notes
* Disabled asset compilation in 2024 due to badly outdated deps. Moved to just including previously bundled files since this site will see zero functional updates moving forwards.
