command -v streamer.sh 1>/dev/null 2>&1 && prettyPrint="streamer.sh -t" || prettyPrint="echo"

server="hdeng@john.cse.taylor.edu"
deploydir="/home/CS/users/hdeng/.linux/public_html/birthday19"

$prettyPrint "Building Project"
npm run build && 
	$prettyPrint "Building complete" || { $prettyPrint "Failed building" ; exit -1; }
$prettyPrint "Deploying project to ${server}:${deploydir}"
ssh ${server} rm -rf ${deploydir}/*
scp -r dist/* ${server}:${deploydir}

$prettyPrint "Deploy complete"
