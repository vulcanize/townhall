module.exports = {
  apps : [
    {
      name      : 'Menlo Town Hall',
      script    : 'yarn',
      args      : 'run build-start:staging',
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy : {
    staging : {
      user : 'deployer',
      host : 'ec2-13-58-70-6.us-east-2.compute.amazonaws.com',
      ref  : 'origin/persistent-contract-addresses',
      repo : 'https://github.com/vulcanize/townhall.git',
      path : '/var/www/menlo-town-hall',
      key  : '../menlo-infra/menlo-staging-deploy.pem',
      ssh_options: ['ForwardAgent=yes', 'StrictHostKeyChecking=no','PasswordAuthentication=no'],
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env production'
    }
  }
};
