[core]
	bare = false
[remote "origin"]
	url = git@gitlab.com:mojo/dojo.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	pushurl = git@gitlab.com:mojo/dojo.git
[branch "myfeature"]
	remote = origin
	merge = refs/heads/myfeature