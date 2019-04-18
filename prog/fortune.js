var MersenneTwister=include('./mt');
function main(date){
	var seed=parseInt(date.split(/[^0-9]/).join(""));
	var d=new Date();
	seed+=parseInt(""+d.getDate()+d.getMonth());
	var mt=new MersenneTwister();
	mt.setSeed(seed);
	var num=mt.nextInt(1,5);
	
	var fortune="あなたの今日の運勢は";
	switch(num){
			case 1:
					fortune+="大凶です。";
					fortune+="単位を落とすかもしれません。しっかり勉強しましょう。";    break;
			case 2:
					fortune+="凶です。";
					fortune+="勉強に励むと運勢アップです。";    break;
			case 3:
					fortune+="小吉です";
					fortune+="今日のあなたはそこそこです。";    break;
			case 4:
					fortune+="チュウキチです";
					fortune+="ラッキーアイテムは、単位です。";  break;
			case 5:
					fortune+="大吉です";
					fortune+="十中八九、単位が取れるでしょう。";break;
	}
	return fortune;
}

