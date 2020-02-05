#include<bits/stdc++.h>
using namespace std;

int calculateMoves(a,h,move) {
    if(h <= 0)
    return move;
    return calculateMoves(a, h - a, move + 1);
}

int main(){
    int a,h;
    cin >> h >> a;
    int move = 0;
    cout << calculateMoves(a,h,move);
}
