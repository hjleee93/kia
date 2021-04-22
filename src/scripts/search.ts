class Search {

     searchHistory: string[] = JSON.parse(
          localStorage.getItem("RecentKeyword")!
     );
     private hasDuplicatedKeyword: boolean = false;

     saveSearchHistory(searchInput: string) {
          //스토리지에 없는 경우
          if (!localStorage.getItem("RecentKeyword")) {
               this.searchHistory = [];
               this.searchHistory.push(searchInput);
               localStorage.setItem(
                    "RecentKeyword",
                    JSON.stringify(this.searchHistory)
               );
          }
          //스토리지에 있는 경우
          else {
               //중복검색어 체크용
               for (const i in this.searchHistory) {
                    if (this.searchHistory[i] === searchInput) {
                         //@ts-ignore
                         this.searchHistory.splice(i, 1);
                         this.searchHistory.unshift(searchInput);
                         localStorage.setItem(
                              "RecentKeyword",
                              JSON.stringify(this.searchHistory)
                         );
                         this.hasDuplicatedKeyword = true;
                         break;
                    } else {
                         this.hasDuplicatedKeyword = false;
                    }
               }

               if (!this.hasDuplicatedKeyword) {
                    //최근 검색어 10개 제한
                    if (this.searchHistory.length === 10) {
                         this.searchHistory.pop();
                         localStorage.removeItem("RecentKeyword");
                         localStorage.setItem(
                              "RecentKeyword",
                              JSON.stringify(this.searchHistory)
                         );
                    }
                    this.searchHistory = JSON.parse(
                         localStorage.getItem("RecentKeyword")!
                    );
                    this.searchHistory.unshift(searchInput);
                    localStorage.setItem(
                         "RecentKeyword",
                         JSON.stringify(this.searchHistory)
                    );
               }
          }

     }

     deleteSearchHistory(idx: number) {
          this.searchHistory.splice(idx, 1);
          localStorage.removeItem("RecentKeyword");
          localStorage.setItem("RecentKeyword", JSON.stringify(this.searchHistory));
          return this.searchHistory;
     }
}

export default Search;