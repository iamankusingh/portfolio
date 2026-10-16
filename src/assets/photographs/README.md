# Photographs

The supplied collection contains `1.webp` through `140.webp`. WebP is the standard format for this collection.

`src/data/photograph.ts` lists every photograph with its source dimensions and a `displayInHome` boolean. Initially, 25 entries are enabled from a one-time random selection. Toggle the flags to choose the final 25; selection does not change on reload. Catalog order controls placement, with the first enabled photograph opening the section.

Both animated and reduced-motion layouts preserve original aspect ratios without cropping. The animated collage uses the original eleven opening positions and staggered scrolling rows, including photographs framed by viewport edges. If replacing a file, update its width and height in the catalog. Replace the provisional numbered alt labels with descriptive text during curation.
