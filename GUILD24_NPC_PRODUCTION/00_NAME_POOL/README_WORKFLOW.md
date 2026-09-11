# GUILD24 NPC Name Pool — Production Sorted

This package is a production convenience re-sort of the approved v1.1.0 name pool.
No name string or M/F assignment was changed.

## Normal portrait workflow
1. Sort your Normal NPC images by eye into M / F / temporary N.
2. N is only a temporary holding group. Move N images into whichever final gender is short until M=100 and F=100.
3. Inside final M, rename images `001.png` through `100.png`.
4. Inside final F, rename images `001.png` through `100.png`.
5. Place them at `NORMAL/M/` and `NORMAL/F/`.
6. Binding is automatic by folder + slot: `NORMAL/M/001.png` ↔ M `001` in `NAME_INDEX.txt`, and same for F.

You do not need to type character names into image filenames.
You do not need to manually edit JSON/catalog files.

Easter and Boss assets are separate and are not counted in the Normal 200.

## Traceability
`ORIGINAL_ID_MAPPING.json` preserves old `N001-N200` IDs for later implementation/migration work.
