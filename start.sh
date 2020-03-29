#! /bin/bash

# Please run as super user
if [ $# -eq 0 ]
  then
    echo "Error Please give PrivateKey as an argument at startup!"
    exit 1
fi

sudo service mongodb stop

mate-terminal --command="bash -c 'cd mongoDB && ./startDB.sh'" &
mate-terminal --command="bash -c 'cd ./NodeServer && export default PrivateKey=$1 && npm start'" &
mate-terminal --command="bash -c 'cd clientapp && npm start'"
wait
exit 0
