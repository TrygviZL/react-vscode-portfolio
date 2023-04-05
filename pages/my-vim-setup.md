# 💻 My minimal-ish .vimrc for Typescript development
## Introduction
You can probably find hundreds of .vimrc around and in then end it is up to the user to figure out a setup that works. This .vimrc file is inspired by Gary Bernhardt who was a guest in the Changelog Podcast episode [Why we 💚 vim](https://changelog.com/podcast/450). In his [.vimrc](https://github.com/garybernhardt/dotfiles/blob/main/.vimrc) Gary has a BASIC EDITING CONFIGURATION block which contains various configurations to make vim a bit more modern. As for extensions, I have tried to make it minimal with 12 plugins, most of which are solely for language support. 

![Vim setup](vim-setup.PNG)

Checkout my .vimrc file on [GitHub](https://github.com/TrygviZL/my-dotfiles/blob/main/.vimrc)

## Upgrade VIM to v9 on WSL
The standard version of VIM that WSL ships with does not support the Coc language server. Below is a bash script that installs the latest version of vim, installs Nodejs as dependency and fetches the [.vimrc](https://github.com/garybernhardt/dotfiles/blob/main/.vimrc) and [coc-settings.json](https://github.com/TrygviZL/my-dotfiles/blob/main/coc-settings.json).

~~~bash
#!/usr/bin/env bash

set -o errexit
set -o nounset

sudo apt-get update

# Uninstall old vim version
sudo apt remove vim
sudo apt autoclean && sudo apt autoremove

# get latest version from ppa repo
sudo apt-add-repository ppa:jonathonf/vim

# update and install vim
sudo apt update
sudo apt install vim


# install nodejs
sudo apt install nodejs

# make directories
mkdir $HOME/.vim

# setup vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

# get .vimrc
wget https://raw.githubusercontent.com/TrygviZL/my-dotfiles/main/.vimrc
mv .vimrc $HOME

# get coc-settings
wget https://raw.githubusercontent.com/TrygviZL/my-dotfiles/main/coc-settings.json
mv coc-settings.json $HOME/.vim

# install plugins 
vim +PlugInstall
~~~