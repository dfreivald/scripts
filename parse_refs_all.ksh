#!/usr/bin/ksh -f
rm REFS_PARSED.csv
cat REF_FILES.txt | while read DISPLAY
do
    parse_refs.pl $DISPLAY >> REFS_PARSED.csv
    echo "Done with $DISPLAY..."
done
