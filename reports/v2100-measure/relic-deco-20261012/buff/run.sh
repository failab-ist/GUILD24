cd /home/user/GUILD24
O=/tmp/claude-0/buff
R(){ node tools/deco-single.cjs 1000 --policy investor --aware --rank "$@"; }
R --sets honorFrame,guildShelf,infirmaryPlaque,heroSign > $O/cur.log 2>&1
R --sets honorFrame --set '{"honorFrame":{"weights":[30,34,23,10,3]}}' > $O/frame70.log 2>&1 &
R --sets honorFrame --set '{"honorFrame":{"weights":[25,34,25,12,4]}}' > $O/frame75.log 2>&1; wait
R --sets guildShelf --set '{"balance":{"wallVisitorChance":0.6}}' > $O/shelf60.log 2>&1 &
R --sets guildShelf --set '{"balance":{"wallVisitorChance":1}}' > $O/shelf100.log 2>&1; wait
R --sets infirmaryPlaque --set '{"infirmaryPlaque":{"healChance":0.6}}' > $O/inf60.log 2>&1 &
R --sets infirmaryPlaque --set '{"infirmaryPlaque":{"healChance":0.8}}' > $O/inf80.log 2>&1; wait
R --sets heroSign --set '{"heroSign":{"days":[0,5]}}' > $O/hero5.log 2>&1 &
R --sets heroSign --set '{"heroSign":{"days":[0,5,10]}}' > $O/hero510.log 2>&1; wait
echo done
