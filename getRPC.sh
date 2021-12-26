curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getSignaturesForAddress",
    "params": [
      "2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6",
      {
        "limit": 1000,
        "until": "4BpP9ugxmnJbCegPXfXXP78A25chuNcLVZzRT4Gu1vPT8nEAbZzWuX8BWeytLR45qASFLb7PzakLCn29wJLQciQ5"
      }
    ]
  }
'


#[昇順] set before, スタートから指定したシグネイチャーの前まで取得する

#[降順]set until, 

# limit より小さい必要がある

# 実装する上では、beforeとlimitを組み合わせる。
# limit 20だとすると、マッチしないかもしれないので、
# limit 30で検索をかける
# でなくなるまでloopする

