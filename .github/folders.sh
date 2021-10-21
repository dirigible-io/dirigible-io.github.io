#!/bin/bash

for i in 1 2 3;
do
    case $i in
        1)
            path=docs-blogs/docs/
            file=lastFiveBlogs.json
        ;;
        2)
            path=docs-releases/docs/
            file=lastFiveReleases.json
        ;;
        3)
            path=docs-news/docs/
            file=lastFiveNews.json
        ;;
        *)
            echo null
        ;;
    esac

    #Get last 5 articles
    lastEntries=$(cd $path && find . -type f -name "*.md" | sort -n | tail -n 6 | sed 's|^./||')

    # define array
    my_array=($lastEntries)

    # unset index.md
    unset  my_array[5]
    arr='[]'  
    for x in "${my_array[@]}"; do
    arr=$(jq -nr --arg x "$x" --argjson arr "$arr" '$arr + [$x]')
    done

    #export the file
    echo $arr | jq '.' > $file
done