# config valid only for Capistrano 3.1
lock '>=3.2.1'

set :application, 'reflect'
set :repo_url, 'git@github.com:joshspears3/reflect.git'
set :linked_dirs, %w{node_modules public/bower_components}
set :linked_files, %w{config/db-connection.js config/production.json config/auth.js}
