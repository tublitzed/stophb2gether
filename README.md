`ssh -i /Users/tublitzed/.ssh/id_rsa-aws.pem ubuntu@ec2-34-229-248-23.compute-1.amazonaws.com`
34.229.248.23

- Lives in the 3blitzed instance.

Ubuntu 16.04.3 LTS

# scripts

- `npm run w`
- `npm run lint`

# initial server setup.

* copy racheltublitz site setup.
* then, add DB and user:

First, create a new role (which is a user for postgres):
- `sudo -u postgres createuser --interactive` - now, follow the prompts.
   ```
     Enter name of role to add: db-username-here
     Shall the new role be a superuser? (y/n) y
  ```
- `sudo -u postgres createdb db-name-here`

- now, change db password:

- `sudo -u postgres psql`
- \password {db-username-here}
- \q

# deployment

`$ cap production deploy`

Then, login to the server and restart if new config needs to get reloaded.

1. `su - deploy`
2. `sudo service nginx restart`

# prod logs:

`tail -f /home/deployer/stophb2gether/current/log/production.log`

# restart Puma in prod

1. cd into app dir
2. `~/.rvm/bin/rvm default do bundle exec pumactl -S /home/deployer/stophb2gether/shared/tmp/pids/puma.state restart`

# restart nginx in prod

1. `sudo service nginx restart`

# seeding prod in production. The seeds file has everything.

* `su - deployer`
* `cd /home/deployer/stophb2gether/current`
* `bundle exec rake db:seed RAILS_ENV=production`

# copy prod db to local:

SSH into prod. Then:

1. `su - deployer`
2. `cd stophb2gether/current`
3. `bundle exec rake db:seed:dump FILE=db/seeds-tmp.rb RAILS_ENV=production`
4. `sudo mv db/seeds-tmp.rb /home/ubuntu/`
5. logout of server
6. `scp -i /Users/tublitzed/.ssh/id_rsa-aws.pem -r ubuntu@ec2-34-229-248-23.compute-1.amazonaws.com:~/seeds-tmp.rb /Users/tublitzed/Desktop/`
7. `atom /Users/tublitzed/Desktop/seeds-tmp.rb`
8. copy contents to local seeds file and rake db:reset

# Rails console in prod:

1. `su - deployer`
2. `cd stophb2gether/current`
3. `bundle exec rails c production`

## Troubleshooting

* For an error like this: `Net::SSH::AuthenticationFailed: Authentication failed for user deployer@xxx` when deploying, try this:
  ```
    $ eval $(ssh-agent)
    $ ssh-add
  ```
  (make sure that you run `ssh-add /home/ubuntu/.ssh/id_rsa_github` with the correct keyname if not using default id_rsa key name)


# Let's encrypt:

To see when cert expires, run:
`/usr/local/sbin$ echo | openssl s_client -connect www.stophb2gether.com:443 2>/dev/null | openssl x509 -noout -dates`

To renew cert, run:
`certbot-auto renew`

Seems that after renewing might need to restart nginx to pick it up.
