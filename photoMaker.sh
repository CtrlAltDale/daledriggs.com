#!/bin/bash

# $1 - path to pics
# $2 - digit to start sequential rename with
file="house.html"

# script is intended to be run in param 1's dir, which should be the photos to adjust
currDir=$PWD
cd $1

# erase metadat
exiftool -all= *.JPEG
rm -rf *_original

# resize
for i in `ls`; do 
    convert $i -resize 1280x960 $i;
done

name=$2
for i in `ls -1`; do 
    new=$(printf "%d.JPEG" "$name");
    mv -i -- "$i" "$new";
    let name=name+1;
done

mv * $currDir/house_photos
cd $currDir

dedent() {
    local -n reference="$1"
    reference="$(echo "$reference" | sed 's/^[[:space:]]*//')"
}

html="<html>

<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
    <link rel=\"icon\" type=\"image/x-icon\" href=\"cottage.png\">
    <title>House photos</title>
</head>

<body>\n"

dedent html

printf "$html" > $file

for i in `ls ./house_photos | sort -nr`; do
    echo "    <img src=\"./house_photos/$i\" />" >> $file;
done

echo "</body></html>" >> $file
tidy -i -m $file
