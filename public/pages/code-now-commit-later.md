# Code now, commit later
![good old git](git-logo.png)
*If you're like me and think that the Classic git workflow is counterproductive and leads to a commit history filled with random commits, look no further.*

## The Classic git workflow

Most, if not everyone in the software development world know the good old git workflow when building a new feature:

1. Create new branch of main `git checkout -b 'feature/new-feature'`
2. As you code, create commits to save work and fix bugs. Ideally such that each commit is at a working state
3. When feature is complete, make a pull request
4. Merge feature branch into main when PR is approved by reviewer

This workflow might seem familiar and that is understandable, it is how most of us were taught to work using git. If you are like me, then you might also feel that this workflow can be a nuisance when deep into the code. I see **two** issues with this workflow: **Firstly**, trying to juggle the code while *also* thinking about when it is appropriate to commit adds unnecessary overhead to the already difficult challenge of writing code.  **Secondly** commits end up containing changes to many files which might include both feature work and changes totally unrelated to the feature you are working on at the moment. This generally leads to a long commit history of changes and fixes where commits contain disparate changes. 

## The Imporved git workflow
But fret not! there is salvation with a git workflow based on the single core principle of **code first, clean up commits later** with the obvious benefit of separating the writing of code from the committing. The **Improved** git workflow is as follows

### 1. Make your changes with the wip-commit
After checking out a feature branch and you start making changes to the code make small commits with the *wip* (work in progress) commit message. As these commits are not meant for the final PR, feel free to commit often to make sure that you do not loose work and use them as general flags for work. 

~~~ bash
$ git checkout -b 'feature/my-feature'

... make changes

$ git commit -am 'wip'

... make changes

$ git commit -am 'wip'
~~~

#### Pro tip: Alias gwip
To avid having to add newly created files and write out `git commit -am 'wip'` all the time, create an alias bu adding the following to your .bashrc:

~~~ shell
alias gwip='git add -A && git commit -m "wip"'
~~~
you can now write `gwip` in your terminal to add all unstaged files and commit them with the "wip" message

### 2. Reset changes

Now that you are finished with your feature and want to prepare a PR, it is time for some cleanup of all the 'wip' commits. Run the following command:

~~~ shell
$ alias gwip='git add -A && git commit -m "wip"'
~~~

This will not change any of the files so no worries, you work is all as it should. It will however reset all the 'wip' commits that you created and make it look like no commits have been made since checking out the feature branch.

~~~ shell
$ git reset origin/main
Unstaged changes after reset:
M       src/app/components/MDContainer.tsx
M       src/app/pages/pages.ts
M       public/pages/code-now-commit-later.md

$ git status 
On branch blog/git-wip-and-reset
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/app/components/MDContainer.tsx
        modified:   src/app/pages/pages.ts
        modified:   public/pages/code-now-commit-later.md
~~~

### 2. Create clean commits
Now it is time to create take all the unstaged changes and group them into separate commits. If only a small number of files are modified or added, then maybe one commit; there is no correct way to group files so it will be up to you.

~~~ shell
$ git add src/app/pages/pages.ts
$ git add public/pages/code-now-commit-later.md
$ git commit -m 'feat: added new blog post'

$ git add src/app/components/MDContainer.tsx
$ git commit -m 'fix: updated code block width
~~~

#### Pro tip: use git add -p to split file into multiple commits
If the same file contains multiple changes that should be grouped separately, you can use the `git add -p` to add only specific changes within a files to a commit. Checkout the blog post by [Markus](https://nuclearsquid.com/writings/git-add/) who explains it way better than I ever could.
