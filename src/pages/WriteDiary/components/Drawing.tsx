import {useState, useEffect, useRef, Fragment} from 'react';
import { useStore } from '../../../store/store';
import {Stage, Layer, Line, Image, Transformer, Circle} from 'react-konva';
import useImage from 'use-image';
import {BsFillCircleFill, BsFillEraserFill } from 'react-icons/bs';
import { FaUndoAlt } from 'react-icons/fa';
import * as DW from '../../../styles/diary/diarywrite.style';

interface RectangleProps{
  image: string;
  shapeProps:{
    x:number;
    y:number;
    width: number;
    height: number;
    fill: string;
    id: string;
  };
  draggable: boolean;
  isSelected: boolean;
  unSelectShape?: any;
  onSelect: any;
  onChange?: any;
  onDelete?: any;
  onClick?: any;
}

const Rectangle = ({ image, shapeProps,draggable, isSelected, unSelectShape, onSelect, onChange, onDelete}:RectangleProps) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [img] = useImage(image,'anonymous');
  const deleteBtn=useRef<any>();
  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const handleDelete = () =>{
    unSelectShape(null);
    onDelete(shapeRef.current);
  }
  return (
    <Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        >
          <Circle
            radius={8}
            fill="red"
            ref={deleteBtn}
            onClick={handleDelete}
            x={img===undefined?0:Math.max(shapeRef.current.width())*1}
          ></Circle>
        </Transformer>
      )}
    </Fragment>
  );
};

interface DrawingProps{
  grim: boolean;
}

interface GrimImageProps{
  id: string;
  img: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

function Drawing(props:DrawingProps){
  const [viewportSize, setViewportSize]=useState({ width: window.innerWidth, height: window.innerHeight });
  const [canvasSize, setCanvasSize]=useState({width:500, height:290});
  const {choiceImg, choiceDalleImg, setUpdateCanvas} = useStore();
  const [grimimage, setGrimimage] = useState<GrimImageProps[]>([]);
  const [dalleImg, setDalleImg] = useState<HTMLImageElement | undefined>(undefined);
  const [selectedId, selectShape] = useState<number | null>(null);
  const [tool, setTool] = useState<string>('pen');
  const [currentColor,setColor]=useState<string>('#000000');
  const listColors:string[]=['#FF0000','#FF6B00','#FFB800', '#00EC42', '#0500FF', '#B200C1', '#FF849D', '#946710', '#000000']
  const [lines, setLines] = useState<any>([]);
  let stageRef=useRef<any>(null);
  const isDrawing = useRef<boolean>(false);
  const checkDeselect = (e:any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleResize = () => {
    setViewportSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if(viewportSize.width>=1441 && viewportSize.height>=831){
      setCanvasSize({width:579, height:290})
    }else if(viewportSize.width>=1181 && viewportSize.height>=681){
      setCanvasSize({width:483, height:250})
    }else if(viewportSize.width>=1101 && viewportSize.height>=601){
      setCanvasSize({width:356, height:197})
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewportSize]);

  useEffect(() => {
    setGrimimage([...grimimage, ...choiceImg.map(item=>{
      return{
        id:item.id,
        img: item.img,
        x:item.x,
        y:item.y,
        width:item.width,
        height: item.height,
        fill:''
      }
    })]);
    if(choiceDalleImg){
      setGrimimage([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceImg]);

  useEffect(() => {
    if(choiceDalleImg){
      const img = new window.Image();
      img.onload = () => {
        setDalleImg(img);
      }
      img.src = choiceDalleImg;
      setDalleImg(img);  
    }
  },[choiceDalleImg, canvasSize]);

  const handleMouseDown = (e:any) => {
    // debugger;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y],color:currentColor }]);
  };
  const handleMouseMove = (e:any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (!lastLine || !lastLine.points) {
      // create a new line if lines is empty or lastLine is undefined
      lastLine = { points: [] };
      setLines([...lines, lastLine]);
    }
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    // lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines.slice(0, -1),lastLine]);
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleExport = () =>{
    const stage = stageRef.current;
    if(stage){
      const dataUrl=stage.toDataURL({
        mimeType:'image/png',
        crossorigin:'anonymous'
      },0.5); 
      setUpdateCanvas(dataUrl);
    }
  }
  const handleRemove=(index:any)=>{
    const newList=grimimage.filter((item, index)=> index !== index);
    setGrimimage(newList);
  }
  const unSelectShape = (prop:any)=>{
    selectShape(prop);
  };
  const onDeleteImage = (node:any)=>{
    const newImage = [...grimimage];
    newImage.splice(node.index,1);
    setGrimimage(newImage);
  }

  return(
    <>
      {choiceDalleImg ? 
      (
        <Stage
          ref={stageRef}
          width={canvasSize.width}
          height={canvasSize.height}>
            <Layer name="image-layer">
              <Image image={dalleImg} 
              width={canvasSize.width-1}
              height={canvasSize.height-1}
              />
            </Layer>
        </Stage>
      ) :(
        <>
          {!props.grim?(
            <Stage
              ref={stageRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseDown={(e) => {      
                checkDeselect(e);
              }}
              onTouchStart={(e) => {
                checkDeselect(e);
              }}
              onMouseLeave={handleExport}
            >
              <Layer>
                {grimimage && grimimage.map((rect, i) => {
                  return (
                    <Rectangle
                      key={i}
                      image={rect.img}
                      shapeProps={rect}
                      isSelected={i === selectedId}
                      unSelectShape={(e:any)=>{unSelectShape(e)}}
                      draggable={true}
                      onClick={handleRemove}
                      onSelect={() => {
                        selectShape(i);
                      }}
                      onChange={(newAttrs: GrimImageProps) => {
                        const rects = grimimage.slice();
                        rects[i] = newAttrs;
                        setGrimimage(rects);
                      }}
                      onDelete={onDeleteImage}
                    />
                  );
                })}
                {lines && lines.map((line:any, i:any) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
              </Layer>
            </Stage>
          ):( <Stage
            ref={stageRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseDown={(e) => {      
              handleMouseDown(e);
              checkDeselect(e);
            }}
            onTouchStart={(e) => {
              handleMouseDown(e);
              checkDeselect(e);
            }}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchMove={(e) => {
              handleMouseMove(e);
            }}
            onTouchEnd={() => {
              handleMouseUp();
            }}
            onMouseLeave={handleExport}
          >
            <Layer>
              {grimimage && grimimage.map((rect, i) => {
                return (
                  <Rectangle
                    key={i}
                    image={rect.img}
                    shapeProps={rect}
                    isSelected={i === selectedId}
                    draggable={false}
                    onSelect={() => {
                      selectShape(i);
                    }}
                    onChange={(newAttrs: any) => {
                      const rects = grimimage.slice();
                      rects[i] = newAttrs;
                      setGrimimage(rects);
                    }}
                  />
                );
              })}
              {lines && lines.map((line:any, i:any) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
            </Layer>
          </Stage>)}
          {props.grim?(
            <DW.DrawingBtnWrap>
              {listColors && listColors.map((map,index)=>{
                return(
                  <BsFillCircleFill key={index} color={map} size="24" style={{marginRight:'8px'}} onClick={()=>{
                    setTool('pen');
                    setColor(map);
                  }} />
                )
              })}
              <img src="images/eraser.svg" alt="eraser" onClick={()=>{setTool('eraser');}}/>
              <img src="/images/undo.svg" alt="undo" onClick={handleUndo}/>
            </DW.DrawingBtnWrap>):('')}
        </>
        )
      }
    </>
  )
}
export default Drawing;