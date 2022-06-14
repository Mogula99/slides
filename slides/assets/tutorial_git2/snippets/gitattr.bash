###############################################################################
# Set default behavior to automatically normalize line endings.
###############################################################################
* text=auto
###############################################################################
# Set default behavior for command prompt diff.
###############################################################################
*.rs       text diff=rust
###############################################################################
# Set the merge driver for project and solution files
###############################################################################
#*.sln       merge=binary
#*.csproj    merge=binary
###############################################################################
# diff behavior for common document formats
# Don't forget to put the following in .git/config:
# [diff "zip"]
#    textconv = unzip -c -a
###############################################################################
*.docx diff=zip