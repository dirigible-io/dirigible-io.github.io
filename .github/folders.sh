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
    articlePaths=($lastEntries)

    # unset index.md
    unset  articlePaths[5]

    #generate json
    arr='[]'  
    for articlePath in "${articlePaths[@]}"; do
        title=$(sed -n '2p' $path$articlePath)
        title=$(echo $title | sed 's/title: "/title: /g' | sed 's/"//g') # remove "" from news
        location="location: ${articlePath}"
        description=$(sed -n '3p' $path$articlePath)
        
        if [[ $description =~ .*description* ]]
        then
            arr=$(jq -nr --arg location "$location"  --arg title "$title" --arg description "$description" --argjson arr "$arr" '$arr + [$location,$title,$description]')    
        else            
            arr=$(jq -nr --arg location "$location" --arg title "$title"  --argjson arr "$arr" '$arr + [$location,$title]')
        fi    
    done
    
    #json format
    [[ $description =~ .*description* ]] && 
        sed=$(echo $arr | 
            sed 's/"location: /{"location":"/g'|
            sed 's/title: /title":"/g' |
            sed 's/", {/"}, {/g' | 
            sed 's/" ]/"}]/g' |
            sed 's/description: /description":"/g'
        ) || 
        sed=$(echo $arr | 
            sed 's/"location: /{"location":"/g'|
            sed 's/title: /title":"/g' |
            sed 's/", {/"}, {/g' | 
            sed 's/" ]/"}]/g' 
        )
    
    #export the file
    echo $sed | jq '.' > $file
done