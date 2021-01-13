


var simplecube ="\
,v 1.000000 1.000000 -1.000000\
,v 1.000000 -1.000000 -1.000000\
,v 1.000000 1.000000 1.000000\
,v 1.000000 -1.000000 1.000000\
,v -1.000000 1.000000 -1.000000\
,v -1.000000 -1.000000 -1.000000\
,v -1.000000 1.000000 1.000000\
,v -1.000000 -1.000000 1.000000\
,vt 0.625000 0.000000\
,vt 0.375000 0.250000\
,vt 0.375000 0.000000\
,vt 0.625000 0.250000\
,vt 0.375000 0.500000\
,vt 0.375000 0.250000\
,vt 0.625000 0.500000\
,vt 0.375000 0.750000\
,vt 0.625000 0.750000\
,vt 0.375000 1.000000\
,vt 0.375000 0.500000\
,vt 0.125000 0.750000\
,vt 0.125000 0.500000\
,vt 0.875000 0.500000\
,vt 0.625000 0.500000\
,vt 0.625000 0.250000\
,vt 0.625000 0.750000\
,vt 0.625000 1.000000\
,vt 0.375000 0.750000\
,vt 0.875000 0.750000\
,vn 0.0000 1.0000 0.0000\
,vn 0.0000 0.0000 1.0000\
,vn -1.0000 0.0000 0.0000\
,vn 0.0000 -1.0000 0.0000\
,vn 1.0000 0.0000 0.0000\
,vn 0.0000 0.0000 -1.0000\
,f 5/1/1 3/2/1 1/3/1\
,f 3/4/2 8/5/2 4/6/2\
,f 7/7/3 6/8/3 8/5/3\
,f 2/9/4 8/10/4 6/8/4\
,f 1/11/5 4/12/5 2/13/5\
,f 5/14/6 2/9/6 6/15/6\
,f 5/1/1 7/16/1 3/2/1\
,f 3/4/2 7/7/2 8/5/2\
,f 7/7/3 5/17/3 6/8/3\
,f 2/9/4 4/18/4 8/10/4\
,f 1/11/5 3/19/5 4/12/5\
,f 5/14/6 1/20/6 2/9/6";


var cube2="\
,v 1.000000 -1.000000 1.000000\
,v -1.000000 -1.000000 -1.000000\
,v 1.000000 -1.000000 -1.000000\
,v -1.000000 1.000000 -1.000000\
,v 0.999999 1.000000 1.000001\
,v 1.000000 1.000000 -0.999999\
,v 1.000000 1.000000 -0.999999\
,v 1.000000 -1.000000 1.000000\
,v 1.000000 -1.000000 -1.000000\
,v 0.999999 1.000000 1.000001\
,v -1.000000 -1.000000 1.000000\
,v 1.000000 -1.000000 1.000000\
,v -1.000000 -1.000000 1.000000\
,v -1.000000 1.000000 -1.000000\
,v -1.000000 -1.000000 -1.000000\
,v 1.000000 -1.000000 -1.000000\
,v -1.000000 1.000000 -1.000000\
,v 1.000000 1.000000 -0.999999\
,v 1.000000 -1.000000 1.000000\
,v -1.000000 -1.000000 1.000000\
,v -1.000000 -1.000000 -1.000000\
,v -1.000000 1.000000 -1.000000\
,v -1.000000 1.000000 1.000000\
,v 0.999999 1.000000 1.000001\
,v 1.000000 1.000000 -0.999999\
,v 0.999999 1.000000 1.000001\
,v 1.000000 -1.000000 1.000000\
,v 0.999999 1.000000 1.000001\
,v -1.000000 1.000000 1.000000\
,v -1.000000 -1.000000 1.000000\
,v -1.000000 -1.000000 1.000000\
,v -1.000000 1.000000 1.000000\
,v -1.000000 1.000000 -1.000000\
,v 1.000000 -1.000000 -1.000000\
,v -1.000000 -1.000000 -1.000000\
,v -1.000000 1.000000 -1.000000\
,vt 0.000000 1.000000\
,vt -1.000000 0.000000\
,vt 0.000000 0.000000\
,vt 0.000000 1.000000\
,vt 1.000000 2.000000\
,vt 1.000000 1.000000\
,vt 1.000000 1.000000\
,vt 0.000000 2.000000\
,vt 1.000000 2.000000\
,vt 1.000000 1.000000\
,vt -0.000000 2.000000\
,vt 1.000000 2.000000\
,vt 0.000000 1.000000\
,vt 1.000000 0.000000\
,vt 1.000000 1.000000\
,vt 0.000000 1.000000\
,vt -1.000000 0.000000\
,vt 0.000000 0.000000\
,vt 0.000000 1.000000\
,vt -1.000000 1.000000\
,vt -1.000000 0.000000\
,vt 0.000000 1.000000\
,vt -0.000000 2.000000\
,vt 1.000000 2.000000\
,vt 1.000000 1.000000\
,vt -0.000000 1.000000\
,vt 0.000000 2.000000\
,vt 1.000000 1.000000\
,vt -0.000000 1.000000\
,vt -0.000000 2.000000\
,vt 0.000000 1.000000\
,vt 0.000000 0.000000\
,vt 1.000000 0.000000\
,vt 0.000000 1.000000\
,vt -1.000000 1.000000\
,vt -1.000000 0.000000\
,vn 0.0000 -1.0000 -0.0000\
,vn -0.0000 1.0000 0.0000\
,vn 1.0000 0.0000 0.0000\
,vn 0.0000 -0.0000 1.0000\
,vn -1.0000 0.0000 0.0000\
,vn 0.0000 0.0000 -1.0000\
,usemtl Cube\
,s off\
,f 1/1/1 2/2/1 3/3/1\
,f 4/4/2 5/5/2 6/6/2\
,f 7/7/3 8/8/3 9/9/3\
,f 10/10/4 11/11/4 12/12/4\
,f 13/13/5 14/14/5 15/15/5\
,f 16/16/6 17/17/6 18/18/6\
,f 19/19/1 20/20/1 21/21/1\
,f 22/22/2 23/23/2 24/24/2\
,f 25/25/3 26/26/3 27/27/3\
,f 28/28/4 29/29/4 30/30/4\
,f 31/31/5 32/32/5 33/33/5\
,f 34/34/6 35/35/6 36/36/6"