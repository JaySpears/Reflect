server 'joshspears.io', user: "ec2-user", roles: %w{app}

set :branch, "master"
set :deploy_to, "/home/ec2-user/reflect"

set :ssh_options, {
  forward_agent: true,
}

namespace :deploy do

    task :npm_install do
      on roles :all do
        execute "cd #{release_path} && npm install"
        execute "cd #{release_path} && bower install"
      end
    end

    after :publishing, :npm_install

    task :restart do
      on roles :all do
        execute "sudo stop reflect", raise_on_non_zero_exit: false
        execute "sudo start reflect"
      end
    end

    after :npm_install, :restart


end
