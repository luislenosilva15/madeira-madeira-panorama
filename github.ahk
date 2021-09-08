#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability. git fetch origin  git reset --hard origin/master
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
 

 ^F1::
Send C:\wamp64\www{Enter}
return
!o::
Send, {=}  ; Press down the up-arrow key.
return  
!l::
Send, {Right}  ; Press down the up-arrow key.
return
!j::
Send, {Left}  ; Press down the up-arrow key.
return
!i::
Send, {Up}  ; Press down the up-arrow key.
return
!k::
Send, {Down}  ; Press down the up-arrow key.
return






#IfWinActive ahk_class mintty
::ad::git add -A
::sh::git show
::amd::git commit --amend --no-edit
::ci::git commit -m "
::st::git status
::ps::git push
::lo::git log
::cl::git clean -df
::rr::git reset --hard origin/dev
::pp::git pull -r
::cc::git checkout
::mm::git merge 
::ft::git fetch --all
::pf::git push --force


#IfWinActive ahk_class Chrome_WidgetWin_1
::ll::=
 
