#!/bin/bash

for i in 1 2 3;
do
    case $i in
        1)
            path=docs-blogs/docs/
            file="blogs.json"
        ;;
        2)
            path=docs-releases/docs/
            file="releases.json"
        ;;
        3)
            path=docs-news/docs/
            file="news.json"
        ;;
        *)
            echo null
        ;;
    esac

    #Get last 5 articles
    lastEntries=$(cd $path && find . -type f -name "*.md" | 
        sort -n |
        tail -n 6 |
        sed 's|^./||'
    )

    # declare array
    my_array=($lastEntries)

    # unset index.md
    unset  my_array[5]

    #generate json
    arr='[]'  
    for x in "${my_array[@]}"; do
        title=$(sed -n '2p' $path$x)
        title=$(echo $title | sed 's/title: "/title: /g' | sed 's/"//g') # remove "" from news articles
        
        arr=$(jq -nr --arg x "$x" --arg title "$title" --argjson arr "$arr" '$arr + [$x,$title]')
    done
    
    #json format
    sed=$(echo $arr | 
        sed 's/"title: /{"title":"/g'| 
        sed 's/", "/"}, "/g' |
        sed 's/" ]/"}]/g' )
    
    #export the file
    echo $sed | jq '.' > $file
done