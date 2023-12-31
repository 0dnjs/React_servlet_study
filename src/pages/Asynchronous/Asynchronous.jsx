import React from 'react';

async function printUser() {

}

function Asynchronous(props) {

/** 
    동기(Synchronous): 순서대로 동작 O, 응답 올 때까지 기다림
    비동기(Asynchronous): 순서대로 동작 X, 요청을 던져놓고 다음 동작을 처리함 응답 오는 순서대로 처리함

    콜백을 사용하는 이유?
    비동기 처리 안에서 내가 지정한 순서대로 함수 호출하려고!

*/
    let num = 0;

    const handleClick = () => {
        num++;

        const click1 = (num) => {
            console.log(`${num} click1!!!`);
        }
        const click1After = () => {
            console.log("click1 다음 실행!")
        }

        const click2 = (num) => {
            console.log(`${num} click2!!!`);
        }

        const click2After = () => {
            console.log("click2 다음 실행!")
        }

        const clickFx = (fx1, fx2) => {
            fx1(num);
            fx2();
        }

        setTimeout(clickFx, Math.random(3) * 1000, click1, click1After); // 비동기
        click1After(); // 동기
        setTimeout(clickFx, Math.random(3) * 1000, click2, click2After); // 비동기
        click2After(); // 동기
        //비동기안에 비동기가 들어가게되면 동기처럼 실행됨

        setTimeout((fx) => {
            click1(num);
            fx();
        }, Math.random(3) * 1000, click1After);// 비동기 처리 함수, 몇 초 후에 실행할지

        setTimeout((fx) => {
            click2(num);
            fx();
        }, Math.random(3) * 1000, click2After);
    };

    const handleClick2 = () => {
        // promise의 기본형태 resolve, reject 꼭 들어가야 함
        // reject는 에러처리, resolve는 then
        const p1 = new Promise((resolve, reject) => {
            const num = Math.random(4);
            if(Math.round(num % 2, 0) === 0) {
                // resolve("프로미스 실행!!");  밑에 result로 들어가짐
                resolve("짝수");
            }else {
                reject(new Error("홀수"))
            }
        });

        p1
        .then(result => {
            console.log(result);
            return "첫번째 then의 리턴"
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }


    const printUser2 = () => {
        return new Promise((resolve, reject) => {
            resolve("유저2");
            reject(new Error("오류2"));
        });
    }

    printUser2().then(r => console.log(r));

    const handleClick3 = () => {

        // 익명함수라서 async를 앞에 붙여준거임
        const printUser = async () => {
            try {
                // await은 async 안에서만 쓸 수 있고 await을 만약에 떼버리면 
                // 비동기로 던져놓고 오류처리부터 실행됨 
                await printUser2().then((r) => {
                    console.log(r);
                });
                // 예외처리는 throw로 함
                throw new Error("오류 처리");
            } catch(error) {
                console.log(error);
            }
            return "유저1";
        }
        // 함수를 호출하면 프로미스를 리턴해줌
        printUser().then(r => console.log(r));

        // 위랑 밑이 같은 식임
        // const printUser2 = () => {
        //     return new Promise((resolve, reject) => {
        //         resolve("유저2");
        //         reject(new Error("오류2"));
        //     });
        // }

        // printUser2().then(r => console.log(r));
    }

    return (
        <div>
            <button onClick={handleClick}>클릭</button>
            <button onClick={handleClick2}>클릭2</button>
            <button onClick={handleClick3}>클릭3</button>
        </div>
    );
}

export default Asynchronous;