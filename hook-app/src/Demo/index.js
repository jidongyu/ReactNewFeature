import React, { Component, useState, useEffect, createContext, useContext, useMemo, memo, useCallback, useRef, PureComponent } from 'react';
import { Button, List, Checkbox } from 'antd';

function Demo() {
    const [dataList, setDataList] = useState([]);
    const [handleDataList, setHandleDataList] = useState([]);
    const add = () => {
        let id = dataList.length ? dataList[dataList.length-1].id + 1 : 0;
        const addList = [...dataList,{id,title:`test${id}`,description:'就是测试'}];
        setDataList(addList);
    }
    const remove = () => {
        let resList = [...dataList];
        handleDataList.forEach( key => {
            resList.splice(key,1);
        } );
        setDataList(resList);
        setHandleDataList([]);
    }
    const onCheckboxChange = (id) => {
        if(handleDataList.includes(id)){
            const index = handleDataList.indexOf(id);
            let resHandleList = [...handleDataList];
            resHandleList.splice(index,1);
            setHandleDataList(resHandleList);
        }else{
            setHandleDataList([...handleDataList,id])
        }
    }
    return (
        <React.Fragment>
            <div>
                <Button type="primary" onClick={add}>添加</Button>
                <Button onClick={remove} disabled={dataList.length===0 || handleDataList.length===0}>删除</Button>
            </div>
            {
                dataList.length ?
                    <List
                        itemLayout="horizontal"
                        dataSource={dataList}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Checkbox onChange={()=>{onCheckboxChange(item.id)}}></Checkbox>}
                                    title={<span>{item.title}</span>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    /> :
                    <h1>暂无数据</h1>
            }


        </React.Fragment>
    )
}

export default Demo;
