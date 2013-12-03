#!/usr/bin/ksh -f
cat REF_FILES_TO_FIX.txt | while read REFID DISPLAY
do
  if [ -e $DISPLAY ]
  then
    fix_refs.pl $REFID $DISPLAY > $DISPLAY.TMP
    rm $DISPLAY
    mv $DISPLAY.TMP $DISPLAY
    echo "Updated REF: $REFID in $DISPLAY..."
  fi
done
echo "Done."
