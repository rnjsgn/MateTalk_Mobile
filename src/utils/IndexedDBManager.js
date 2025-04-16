const { v4: uuidv4 } = require("uuid");

/**
 *로컬 스토리지 조회
 * @param callback
 * ---
 */
const getBrowserLocalStorage = (type) => {
    const result = [];
    if (type === "room") {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("roomid")) {
                const value = localStorage.getItem(key);
                result.push({ key, value: parseInt(value) });
            }
        }
    } else if (type === "device") {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("deviceid")) {
                const value = localStorage.getItem(key);
                result.push({ key, value: parseInt(value) });
            }
        }
    } else if (type === "connect") {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("connect_Room")) {
                const value = localStorage.getItem(key);
                result.push({ key: key.split("connect_Room_")[1], value });
            }
        }
    } else if (type === "storage") {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("storage")) {
                const value = localStorage.getItem(key);
                result.push({ key: key, value });
            }
        }
    }

    return result;
};

/**
 * 인덱스 디비에서 파일 사이즈 체크
 *  --
 * @returns toDataSize : number
 *
 */
const toDataSize = async () => {
    const getIndexdbStorage = await getAllObjectsFromDB();
    const toDataSize = getIndexdbStorage.reduce((sum, item) => {
        const dataSize =
            item &&
                item.data &&
                !String(item.id).includes("dummy") &&
                typeof item?.data?.blob_data?.byteLength === "number"
                ? item?.data?.blob_data?.byteLength
                : 0;
        return sum + dataSize;
    }, 0);
    return toDataSize;
};

//바이트 기가 바이트 변환
const toGigabytes = (bytes) => bytes / (1024 ** 3);

/**
 * indexedDB 데이터베이스 저장 용량 갱신 및 조회
 * --
 */
export const checkStorageUsage = async () => {
    console.log('[checkStorageUsage]')
    // 스토리지를 사용할 수 없을 경우
    if (!navigator.storage || !navigator.storage.estimate) {
        console.error('Storage estimation not supported in this browser');
        return;
    }

    try {
        const storage = await navigator.storage.estimate();

        // 바이트를 기가바이트로 변환
        // 로컬 스토리지 조회
        const getStorage = getBrowserLocalStorage('storage');

        // 내 PC 저장소 조회
        const getTotalStorage = storage.quota;

        // 설정된 스토리지 조회
        const setStorageSize = getStorage.length > 0 ? getStorage[0]?.value : 0;

        // 저장된 파일 용량
        const todatasize = await toDataSize();

        // 기가바이트 환산
        // const totalStorage = toGigabytes(getTotalStorage).toFixed(2);
        // const getstorage = toGigabytes(setStorageSize).toFixed(2);
        // const userStorageIndex = toGigabytes(toDataSize).toFixed(2);
        // const remainStorage = toGigabytes(setStorageSize - toDataSize).toFixed(2);
        // const percentStorage = `${((toDataSize / setStorageSize) * 100).toFixed(2)}`;
    } catch (err) {
        console.error('Error estimating storage: ', err);
    }
}

//입풋 값 바이트 변환
const convertToBytes = (input, unit) => {
    if (unit.toLowerCase() === 'mb') {
        // 메가바이트를 바이트로 변환
        return input * 1024 * 1024;
    } else if (unit.toLowerCase() === 'gb') {
        // 기가바이트를 바이트로 변환
        return input * 1024 * 1024 * 1024;
    } else {
        // 지원하지 않는 단위는 에러 메시지 반환
        return 0;
    }
}

/**
 * 저장 공간 할당
 */
export const allocateStorage = async (volume, type) => {
    console.log('[allocateStorage]');
    //인풋 벨류 검사
    //저장 용량 가져오기
    const storage = await navigator.storage.estimate();
    //이전 설정 가져오기
    const getStorage = getBrowserLocalStorage("storage")
    const pastSetStorage = getStorage[0]?.value;
    const tranceBytes = convertToBytes(parseInt(volume), type)
    //저장된 파일 용량
    const todataSize = await toDataSize()
    //1MB
    const OneMb = 1024 * 1024
    //총 저장 공간 검사
    if (storage.quota < tranceBytes) {
        alert("총 공간 보다 높게 설정할 수 없습니다.")
        //저장된 파일 용량 검사
    } else if (todataSize > tranceBytes) {
        alert("저장된 파일 용량 보다 작게 설정할 수 없습니다.")
    } else {
        //메가 바이트
        //현재 설정한게 이전 보다 클시
        if (!pastSetStorage) {
            console.log('if (!pastSetStorage)')
            const result = await createDummyData(tranceBytes, "loop");
            if (result) {
                localStorage.setItem(`storage`, String(tranceBytes));
                checkStorageUsage()
            } else {
                alert("더미 파일 생성 실패 다시 시도 해주세요.")
            }
        } else if (tranceBytes > pastSetStorage) {
            console.log('else if (tranceBytes > pastSetStorage)')
            //크면은 새로 - 이전 남은 메가 만큼 생성
            const result = await createDummyData(tranceBytes - pastSetStorage, "loop");
            if (result) {
                localStorage.setItem(`storage`, String(tranceBytes));
                checkStorageUsage()
            } else {
                alert("더미 파일 생성 실패 다시 시도 해주세요.")
            }
        } else {
            console.log('else')
            //작으면 이전 - 새로 / 메가 만큼 제거
            const deleteDummyCount = (pastSetStorage - tranceBytes) / OneMb
            const result = await deletedummyFromDB(deleteDummyCount, "loop")
            if (result) {
                localStorage.setItem(`storage`, String(tranceBytes));
                checkStorageUsage()
            } else {
                alert("더미 파일 생성 실패 다시 시도 해주세요.")
            }
        }
    }
}


/**
* indexedDB 데이터베이스 열기 및 생성
* ---
* @returns
*/
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("matetalk", 1);
        request.onerror = (event) => {
            reject(
                "데이터베이스 열기 오류: " + event.target.error
            );
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("FileList")) {
                db.createObjectStore("FileList", { keyPath: "id" });
                db.createObjectStore("DummyList", { keyPath: "id" });
            }
        };
    });
};
/**
 * indexedDB 데이터 저장
 * ---
 * @param key :string
 * @param data: object
 * @returns
 */
export const addObjectToDB = (
    key,
    data
) => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["FileList"], "readwrite");
            const objectStore = transaction.objectStore("FileList");
            console.log({ id: key, data: data })
            const request = objectStore.put({ id: key, data: data });
            console.log(request)

            transaction.oncomplete = () => {
                resolve({ status: 200, data: { file_name: `${data?.file_name}` } });
            };
            request.onerror = (event) => {
                reject({
                    status: event.target.error,
                    data: { file_name: `${data?.file_name}` },
                });
                reject("데이터 추가 오류: " + event.target.error);
            };
        });
    });
};

/**
 * indexedDB one 데이터 조회
 * ---
 * @param key :number
 * @returns
 */
export const getOneObjectFromDB = (key) => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["FileList"], "readonly");
            const objectStore = transaction.objectStore("FileList");
            const request = objectStore.get(key);

            request.onsuccess = (event) => {
                const result = event.target.result;
                resolve(result);
            };

            request.onerror = (event) => {
                reject("데이터 조회 오류: " + event.target.error);
            };
        });
    });
};

/**
 * indexedDB 데이터 조회 (모든 데이터 조회)
 * ---
 * @returns Promise<Array<any>>
 */

export const getAllObjectsFromDB = () => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["FileList"], "readonly");
            const objectStore = transaction.objectStore("FileList");
            const request = objectStore.getAll();

            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result) {
                    resolve(result);
                } else {
                    resolve([]);
                }
            };

            request.onerror = (event) => {
                reject("데이터 조회 오류: " + event.target.error);
            };
        });
    });
};

/**
 * indexedDB 업데이트
 * ---
 * @param key :string
 * @param data :object
 * @returns
 */
export const updateObjectInDB = (
    key,
    newData
) => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["FileList"], "readwrite");
            const objectStore = transaction.objectStore("FileList");
            const request = objectStore.put({
                id: key,
                data: newData.data,
                otherData: newData.otherData,
            });

            transaction.oncomplete = () => {
                resolve("데이터가 수정되었습니다.");
            };
            request.onerror = (event) => {
                reject("데이터 수정 오류: " + event.target.error);
            };
        });
    });
};

/**
 * indexedDB 삭제
 * ---
 * @param key :string
 * @returns
 */
export const deleteObjectFromDB = (key) => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["FileList"], "readwrite");
            const objectStore = transaction.objectStore("FileList");
            const request = objectStore.delete(parseInt(key));
            transaction.oncomplete = () => {
                resolve(true);
            };

            request.onerror = (event) => {
                console.log(event.target.error);
                reject(false);
            };
        });
    });
};

/**
 * 더메 파일 저장(반복문)
 * ---
 * @param totalbytes : number
 *
 * @returns
 */

const createDummyData = (
    totalbytes,
    type
) => {
    console.log('[createDummyData]');
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["DummyList"], "readwrite");
            const objectStore = transaction.objectStore("DummyList");
            //루프 돌면서 MB만큼 더미 생성
            if (type === "loop" && totalbytes > 0) {
                const onebytes = 1024 * 1024;
                // 총 몇 메가?(횟수)
                const countMeagbytes = totalbytes / onebytes;
                for (let i = 1; i <= countMeagbytes; i++) {
                    //메가 단위로 변환
                    const Blob = createDummyFile(onebytes);
                    const request = objectStore.put({
                        id: `MBD_${uuidv4()}`,
                        data: Blob,
                    });
                    request.onerror = (event) => {
                        reject(
                            "데이터 추가 오류: " + event.target.error
                        );
                    };
                }
                //나머지 키로 바이트 생성 할 때
            } else if (type === "unloop" && totalbytes > 0) {
                const Blob = createDummyFile(totalbytes);
                const request = objectStore.put({ id: `KBD_${uuidv4()}`, data: Blob });
                request.onerror = (event) => {
                    reject(
                        "데이터 추가 오류: " + event.target.error
                    );
                };
            }
            transaction.oncomplete = () => {
                resolve(true);
            };
        });
    });
};

/**
 * 더미 데이터 조회
 * ---
 * @returns Promise<Array<findFile>>
 */
const getAlldummyFromDB = () => {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["DummyList"], "readonly");
            const objectStore = transaction.objectStore("DummyList");
            const request = objectStore.getAll();
            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result) {
                    resolve(result);
                } else {
                    resolve([]);
                }
            };

            request.onerror = (event) => {
                reject("데이터 조회 오류: " + event.target.error);
            };
        });
    });
};
/**
 * 삭제
 * ---
 * @param count :number
 * @returns
 */
const deletedummyFromDB = async (
    count,
    type
) => {
    try {
        const db = await openDB();
        const transaction = db.transaction(["DummyList"], "readwrite");
        const objectStore = transaction.objectStore("DummyList");
        const request = objectStore.openCursor(null, "prev");
        const deleteFile = async (cursor) => {
            return new Promise((resolve) => {
                const oldestFileKey = cursor.primaryKey;
                objectStore.delete(oldestFileKey).onsuccess = () => {
                    cursor.continue();
                    resolve();
                };
            });
        };

        if (type === "loop") {
            //스토리지 설정에서 사용
            for (let i = 1; i <= count; i++) {
                const cursor = await new Promise < IDBCursor > ((resolve) => {
                    request.onsuccess = (event) =>
                        resolve(event.target.result);
                });

                if (cursor) {
                    await deleteFile(cursor);
                }
            }
        } else {
            for (let i = 1; i <= count + 1; i++) {
                const cursor = await new Promise < IDBCursor > ((resolve) => {
                    request.onsuccess = (event) =>
                        resolve(event.target.result);
                });
                if (cursor) {
                    await deleteFile(cursor);
                }
            }
        }
        return true;
    } catch (error) {
        console.error(`Error in deletedummyFromDB: ${error}`);
        return false;
    }
};
//더미 생성 1메가
const createDummyFile = (fileSizeInBytes) => {
    const dummyData = new Uint8Array(fileSizeInBytes);
    return new Blob([dummyData], { type: "application/octet-stream" });
};