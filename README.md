# stophb2gether
Anti hb2 site dedicate to tracking lost revenue to the state of NC since HB2.


# scripts

- `npm run w`
- `npm run lint`

# deployment

`$ cap production deploy`

Then, login to the server and restart if new config needs to get reloaded.

1. `ssh -i /Users/tublitzed/.ssh/id_rsa-aws.pem ubuntu@ec2-52-91-46-41.compute-1.amazonaws.com`
2. `su - deploy`
3. `sudo service nginx restart`

# prod logs:

`tail -f /home/deploy/stophb2gether/current/log/production.log`

# restart Puma in prod

1. cd into app dir
2. `~/.rvm/bin/rvm default do bundle exec pumactl -S /home/deploy/stophb2gether/shared/tmp/pids/puma.state restart`

# restart nginx in prod

1. `sudo service nginx restart`

# copy prod db to local:

SSH into prod. Then:

1. `su - deploy`
2. `cd stophb2gether/current`
3. `bundle exec rake db:seed:dump FILE=db/seeds-tmp.rb RAILS_ENV=production`
4. `sudo mv db/seeds-tmp.rb /home/ubuntu/`
5. logout of server
6. `scp -i /Users/tublitzed/.ssh/id_rsa-aws.pem -r ubuntu@ec2-52-91-46-41.compute-1.amazonaws.com:~/seeds-tmp.rb /Users/tublitzed/Desktop/`
7. `atom /Users/tublitzed/Desktop/seeds-tmp.rb`
8. copy contents to local seeds file and rake db:reset

# Rails console in prod:

1. `su - deploy`
2. `cd stophb2gether/current`
3. `bundle exec rails c production`

# Let's encrypt:

To see when cert expires, run:
`/usr/local/sbin$ echo | openssl s_client -connect www.stophb2gether.com:443 2>/dev/null | openssl x509 -noout -dates`

To renew cert, run:
`certbot-auto renew`

Seems that after renewing might need to restart nginx to pick it up.
