import React, {Component} from 'react';
import classicTable from './JSON/ClassicTable';
import transparentTable from './JSON/TransparentTable';
import chipData from './JSON/Chips'
import betTable from './JSON/BetTable';
import * as PIXI from 'pixi.js';
import './App.css';

// Mouse & touch events are normalized into
// the pointer* events for handling different
// button events.
//    .on('pointerdown', alert(this.currentX))
//    .on('pointerup', alert(this.currentX))
//    .on('pointerupoutside', alert(this.currentX))
//    .on('pointertap', () => console.log(this.currentY))
//    .on('pointerover', alert(this.currentX))
//    .on('pointerout', alert(this.currentX));

// Use mouse-only events
// .on('mousedown', onButtonDown)
// .on('mouseup', onButtonUp)
// .on('mouseupoutside', onButtonUp)
//.on('mouseover', alert(this.currentX))
// .on('mouseout', onButtonOut)

// Use touch-only events
//.on('touchstart', alert(this.currentX))
// .on('touchend', onButtonUp)
// .on('touchendoutside', onButtonUp)

// WHAT IS LEFT
// 1. Make the table look the same as origianl (Introducing Also Assets on Background, only if it has)
// 2. Refactor parts the right way (Is shiity atm, due is only made for simulation)

class App extends Component {

    //================================
    // __INIT__ / void main()
    //================================

    constructor(props) {
        super(props)

        this.chipAmountMap = {}
        this.betHistory = [];
        this.beforeRefreshHistory = [];
        this.saveBetsList = [];
        this.currentTable = null;
        this.currentWinIcon = null;
    }

    //================================
    // REACT COMPONENTS
    //================================

    componentDidMount() {

        this.createPixiCanvas();

        this.buildTable();
    }

    //================================
    // UTILS
    //===============================
    showMessage(msg, type) {
        const messageArea = document.getElementsByClassName('sgMessageBox')[0]

        messageArea.classList.add(type)
        messageArea.innerHTML = msg;

        setTimeout(() => this.hideMessage(), 2500);
    }

    hideMessage() {
        const messageArea = document.getElementsByClassName('sgMessageBox')[0]

        messageArea.classList.remove("critical")
        messageArea.classList.remove("warning")
        messageArea.innerHTML = "";
    }


    //================================
    // VALIDATE BET
    //================================
    validateBet(betAmount) {
        if (!betAmount)
            return {
                allowBet: false,
                msg: "undefined bets"
            }

        const maxBet = betTable.BetAreasConfig.MaxBets;
        const minBet = betTable.BetAreasConfig.MinBets;

        if (betAmount > maxBet) {
            return {
                allowBet: false,
                msg: "Max bet is " + maxBet
            }
        } else if (betAmount < minBet) {
            return {
                allowBet: false,
                msg: "Min bet is " + minBet
            }
        }

        return {
            allowBet: true,
            msg: "Bets has been placed!"
        }
    }

    //================================
    // GETTERS Obj; AND SETTERS Obj;
    //================================

    getChipAmountMap(key) {
        return this.chipAmountMap[String(key).replace(' ', '_')] || {};
    }

    setCipAmountMap(key, list) {
        if (typeof list !== "object") {
            throw new Error("setCipAmountMap requires key and list to assign")
            return
        }

        if (this.chipAmountMap[String(key).replace(' ', '_')]) {
            Object.assign(this.chipAmountMap[String(key).replace(' ', '_')], list)
        } else {
            this.chipAmountMap[String(key).replace(' ', '_')] = list;
        }
    }

    getChipValue() {
        return this.chipValue;
    }

    setChipValue(chipValue) {
        this.chipValue = chipValue;
    }

    getShapesMap(key) {
        return this.shapesMap[String(key).replace(' ', '_')];
    }

    setShapeMap(key, list) {
        if (typeof list !== "object") {
            throw new Error("setShapeMap requires key and list to assign")
            return
        }
        this.shapesMap[String(key).replace(' ', '_')] = list;
    }

    getBetHistory(key) {
        return this.betHistory[key];
    }

    setBetHistory(list) {
        if (typeof list !== "object") {
            throw new Error("setBetHistory accept 1 paramter as object")
            return
        }
        this.betHistory.push(list)
    }

    destroyModel(models) {
        if (typeof models !== "object") {
            throw new Error("DestroyModel accept 1 paramter as array - Use shapeMap.Chip")
            return
        }
        if (models.length > 0) {
            models.map(model => model.destroy())
        }
    }

    getChipModel(shapeMap) {
        if (typeof shapeMap !== "object") {
            throw new Error("getChipModel accept 1 paramter as array - Use shapeMap")
            return
        }
        return shapeMap.Chip;
    }

    getChipImage(totalChipBet) {
        const chipPath = chipData.ChipPaths[String(totalChipBet)]

        return chipPath ? chipPath : chipData.ChipPaths.defaultChip;
    }

    getObjectKeys(obj) {
        if (typeof obj !== "object") {
            throw new Error("getObjectKeys accept 1 paramter as object")
            return
        }
        return Object.keys(obj);
    }

    //========================
    // DRAW SHAPE
    //========================
    drawRectangle({
                      Shape, LeftX, TopY, Width, Height, Background, Transparency, BorderSize, BorderColor, BorderTransparency = 1
                  }) {
        Shape.beginFill(Background, Transparency);
        Shape.lineStyle(BorderSize, BorderColor, BorderTransparency);
        Shape.drawRect(LeftX, TopY, Width, Height);
        Shape.endFill();
    }

    //========================
    // EXTERNAL FUNCTIONALITIES
    //========================

    undoBets() {
        const lastBet = this.getBetHistory(this.betHistory.length - 1)

        if (lastBet) {
            const universalKey = lastBet.MapKey;
            const shapeMapped = this.getShapesMap(universalKey)
            const Models = this.getChipModel(shapeMapped);
            const currentBetAmount = Number(Models.ChipText.text);
            const previousBetAmount = currentBetAmount - lastBet.Amount;

            if (Models.ChipText && Models.ChipModel) {

                if (previousBetAmount > 0) {
                    const chipPath = this.getChipImage(previousBetAmount);

                    Models.ChipModel.texture = new PIXI.Texture.fromImage(chipPath)
                    Models.ChipText.text = previousBetAmount;

                    this.setCipAmountMap(universalKey, {
                        Amount: previousBetAmount
                    })
                } else {
                    this.destroyModel([
                        Models.ChipModel,
                        Models.ChipText
                    ]);

                    shapeMapped.Chip = null;
                    this.setShapeMap(universalKey, shapeMapped)
                    this.setCipAmountMap(universalKey, {
                        Amount: 0
                    })
                }
            }

            const getIndex = this.betHistory.indexOf(lastBet)
            if (getIndex > -1) {
                this.betHistory.splice(getIndex, 1);
            }
        }
    }

    clearBets() {
        this.beforeRefreshHistory = this.betHistory;
        this.betHistory = [];
        this.beforeRefreshHistory.map(currentBet => {
            if (currentBet.MapKey) {
                const universalKey = currentBet.MapKey;
                const shapeMapped = this.getShapesMap(universalKey)
                const Models = this.getChipModel(shapeMapped);

                if (Models) {
                    this.destroyModel([
                        Models.ChipText,
                        Models.ChipModel
                    ])

                    shapeMapped.Chip = null;
                    this.setShapeMap(universalKey, shapeMapped)

                    this.setCipAmountMap(universalKey, {
                        Amount: 0
                    })
                }
            }
        })
    }

    repeatBets() {
        if (this.beforeRefreshHistory.length) {

            this.beforeRefreshHistory.map(bet => {
                const universalKey = bet.MapKey;

                if (universalKey) {
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }
    }

    doubleBets() {
        if (this.betHistory.length) {

            this.betHistory.map(bet => {
                const universalKey = bet.MapKey;

                if (universalKey) {
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }
    }

    saveBets(listIndex) {
        this.saveBetsList[listIndex] = this.betHistory;
    }

    placeSavedBets(listIndex) {
        if (this.saveBetsList.length && this.saveBetsList[listIndex].length) {
            this.saveBetsList[listIndex].map(bet => {
                const universalKey = bet.MapKey;

                if (universalKey) {
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }
    }

    placeSpecailBet(Id) {
        const currentSpecailBet = betTable.SpecialBets
            .filter(specailBet => specailBet.Id === Id)[0]

        currentSpecailBet.BetsAreas.map(betAreaKey => this.makeBet(this.getShapesMap(betAreaKey)));
    }

    showWinningNum({betShapeId, winAmount}){
        if(!betShapeId || !this.currentWinIcon)
            return;

        const shapeMap = this.getShapesMap(betShapeId);

        if(shapeMap) {
            const ShapeProperties = shapeMap.Shape;

            const winningImg = this.currentWinIcon.Background;
            const winningShape = new PIXI.Sprite.fromImage(winningImg);

            const winningFont = this.currentWinIcon.Font;
            const winningText = new PIXI.Text(String(winAmount),winningFont);

            //const winningTicker = new PIXI.ticker.Ticker();

            const winningImgWidth = (ShapeProperties.Width + this.currentWinIcon.ExtraWidth);
            const winningImgHeight = (ShapeProperties.Height + this.currentWinIcon.ExtraHeight);
            const winningImgX = (ShapeProperties.X + (winningImgWidth / 2)) - (this.currentWinIcon.ExtraWidth / 2);
            const winningImgY = (ShapeProperties.Y + (winningImgHeight / 2)) - (this.currentWinIcon.ExtraHeight / 2);

            const winningTextY = (ShapeProperties.Y + (winningImgWidth / 2)) - (this.currentWinIcon.ExtraWidth / 2);
            const winningTextX = (ShapeProperties.X + (winningImgHeight / 2)) - (this.currentWinIcon.ExtraHeight / 2);

            let isIncreaseMode = true;

            winningShape.width = winningImgWidth;
            winningShape.height = winningImgHeight;
            winningShape.x = winningImgX;
            winningShape.y = winningImgY;
            winningShape.anchor.set(0.5);

            winningText.text = winAmount;
            winningText.x = winningTextX;
            winningText.y = winningTextY;
            winningText.anchor.set(0.5);
            // winningTicker.autoStart = true;
            //
            // winningTicker.add((delta) => {
            //     if(isIncreaseMode) {
            //         isIncreaseMode = false;
            //
            //         winningShape.width += 1 * delta;
            //         winningShape.height += 1 * delta;
            //         winningText.fontSize += 1 * delta;
            //     }else {
            //         isIncreaseMode = true;
            //
            //         winningShape.width -= 1 * delta;
            //         winningShape.height -= 1 * delta;
            //         winningText.fontSize -= 1 * delta;
            //     }
            // })
            //
            // winningTicker.start();

            setTimeout(() => {
               // winningTicker.stop();

                this.clearBets();

                this.destroyModel([
                //    winningTicker,
                    winningShape,
                    winningText
                ])
            }, 5000)

            if(winningShape && winningText) {
                this.pixiTableDesign.stage.addChild(winningShape, winningText)
            }


        }
    }

    makeBet(shapeMap) {
        const chipConfig = chipData.ChipTextConfig;
        const fontWeight = chipConfig.defaultWeight;
        const fontSize = chipConfig.defaultSize;
        const fontFamily = chipConfig.defaultFamily;
        const fontColor = chipConfig.defaultColor;
        const fontStroke = chipConfig.defaultStroke;
        const fontThickness = chipConfig.defaultThickness;

        const universalKey = String(shapeMap.Id);
        const chipMapped = this.getChipAmountMap(universalKey);

        const chipAmount = this.getChipValue();
        // increase chip amount
        const chipNewAmount = chipMapped.Amount + chipAmount;

        const chipPath = this.getChipImage(chipNewAmount);

        const isValidBet = this.validateBet(chipNewAmount);

        if (!isValidBet.allowBet) {
            this.showMessage(isValidBet.msg, 'critical')
            return;
        }

        const chipModel = shapeMap.Chip ? shapeMap.Chip.ChipModel : new PIXI.Sprite.fromImage(chipPath);
        const chipText = shapeMap.Chip ? shapeMap.Chip.ChipText : new PIXI.Text(String(chipAmount), {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: fontColor,
            align: 'center',
            stroke: fontStroke,
            strokeThickness: fontThickness
        })

        const chipWidth = chipData.ChipConfig && chipData.ChipConfig.Width ? chipData.ChipConfig.Width : shapeMap.Shape.Width / 2;
        const chipHeight = chipData.ChipConfig && chipData.ChipConfig.Height ? chipData.ChipConfig.Height : shapeMap.Shape.Height / 2

        // we just need to change the cords of these biitchs, biitch x and biitch y
        const chipX = shapeMap.Shape.X + (shapeMap.Shape.Width / 2);
        const chipY = shapeMap.Shape.Y + (shapeMap.Shape.Height / 2);

        if (chipModel && chipText && chipMapped.Amount > 0) {
            chipModel.texture = new PIXI.Texture.fromImage(chipPath)
            chipText.text = chipNewAmount;
            // ADD CHIP
            chipModel.width = chipWidth;
            chipModel.height = chipHeight;
            chipModel.x = chipX;
            chipModel.y = chipY;

            chipText.x = chipX;
            chipText.y = chipY;

            chipModel.anchor.set(0.5)
            chipText.anchor.set(0.5);
        } else if (chipModel && chipText) {

            // ADD CHIP
            chipModel.width = chipWidth;
            chipModel.height = chipHeight;
            chipModel.x = chipX;
            chipModel.y = chipY;

            chipText.x = chipX;
            chipText.y = chipY;

            chipModel.anchor.set(0.5)
            chipText.anchor.set(0.5);
        }

        if (chipModel && chipText) {
            this.pixiTableDesign.stage.addChild(chipModel, chipText);
        }

        const newShapeMapped = Object.assign(this.getShapesMap(universalKey), {
            Chip: {
                ChipModel: chipModel,
                ChipText: chipText
            }
        });

        this.setShapeMap(universalKey, newShapeMapped)

        this.setBetHistory({
            MapKey: String(universalKey),
            Amount: chipAmount
        })

        this.setCipAmountMap(universalKey, {
            Amount: chipNewAmount
        })
    }

    switchTable(tableData, allowRefresh) {
        if (tableData === this.currentTable)
            return;

        this.currentTable = tableData;
        this.beforeRefreshHistory = this.betHistory;

        if (allowRefresh) {
            this.clearBets();
            this.switchBuiltTable()
            this.repeatBets()
        }
    }

    //================================
    // CANVAS HANDLERS
    //================================

    onShapeBetHoverIN(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const ShapeCtx = shapeMap.Shape.Graphic;
        const ShapeProperties = shapeMap.Shape

        this.drawRectangle({
            Shape: ShapeCtx,
            LeftX: ShapeProperties.X,
            TopY: ShapeProperties.Y,
            Width: ShapeProperties.Width,
            Height: ShapeProperties.Height,
            Background: ShapeProperties.HoverBackColor,
            Transparency: ShapeProperties.HoverBackColorAlpha,
            BorderSize: ShapeProperties.HoverBorderSize,
            BorderColor: ShapeProperties.HoverBorderColor
        })
    }

    onShapeBetHoverOUT(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const ShapeCtx = shapeMap.Shape.Graphic;
        const ShapeProperties = shapeMap.Shap;

        this.drawRectangle({
            Shape: ShapeCtx,
            LeftX: ShapeProperties.X,
            TopY: ShapeProperties.Y,
            Width: ShapeProperties.Width,
            Height: ShapeProperties.Height,
            Background: ShapeProperties.NormalBackColor,
            Transparency: ShapeProperties.NornalBackColorAlpha,
            BorderSize: ShapeProperties.NormalBorderSize,
            BorderColor: ShapeProperties.NormalBorderColor
        })
    }

    onShapeBetClick(event) {
        if (!this.getChipValue()) {
            return;
        }        
        this.makeBet(event.currentTarget.shapeMap)
    }

    onChangeStatsClick(event) {
        alert('Change stats')
    }

    onChangeRaceTrack(event) {
        alert('Change racetrack')
    }

    multiBetHoverInShapes(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const highlightList = shapeMap.HighlightShapes;


        this.getObjectKeys(highlightList).forEach((row, index) => {
            highlightList[row].map(shapeId => {
                const getShapeMapped = this.getShapesMap(shapeId);
                const ShapeCtx = getShapeMapped.Shape.Graphic;
                const ShapeProperties = getShapeMapped.Shape;

                this.drawRectangle({
                    Shape: ShapeCtx,
                    LeftX: ShapeProperties.X,
                    TopY: ShapeProperties.Y,
                    Width: ShapeProperties.Width,
                    Height: ShapeProperties.Height,
                    Background: ShapeProperties.HoverBackColor,
                    Transparency: ShapeProperties.HoverBackColorAlpha,
                    BorderSize: ShapeProperties.HoverBorderSize,
                    BorderColor: ShapeProperties.HoverBorderColor
                })

            })
        })
    }

    multiBetHoverOutShapes(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const highlightList = shapeMap.HighlightShapes;

        this.getObjectKeys(highlightList).forEach((row, index) => {
            highlightList[row].map(shapeId => {
                const getShapeMapped = this.getShapesMap(shapeId);
                const ShapeCtx = getShapeMapped.Shape.Graphic;
                const ShapeProperties = getShapeMapped.Shape;

                this.drawRectangle({
                    Shape: ShapeCtx,
                    LeftX: ShapeProperties.X,
                    TopY: ShapeProperties.Y,
                    Width: ShapeProperties.Width,
                    Height: ShapeProperties.Height,
                    Background: ShapeProperties.NormalBackColor,
                    Transparency: ShapeProperties.NornalBackColorAlpha,
                    BorderSize: ShapeProperties.NormalBorderSize,
                    BorderColor: ShapeProperties.NormalBorderColor
                })
            })
        })
    }

    specialBetsHoverIn(highlightList) {
        this.getObjectKeys(highlightList).forEach((row, index) => {
            const shapeId = highlightList[row];
            const getShapeMapped = this.getShapesMap(shapeId);
            const ShapeCtx = getShapeMapped.Shape.Graphic;
            const ShapeProperties = getShapeMapped.Shape;

            this.drawRectangle({
                Shape: ShapeCtx,
                LeftX: ShapeProperties.X,
                TopY: ShapeProperties.Y,
                Width: ShapeProperties.Width,
                Height: ShapeProperties.Height,
                Background: ShapeProperties.HoverBackColor,
                Transparency: ShapeProperties.HoverBackColorAlpha,
                BorderSize: ShapeProperties.HoverBorderSize,
                BorderColor: ShapeProperties.HoverBorderColor
            })
        })
    }

    specialBetsHoverOut(highlightList) {
        this.getObjectKeys(highlightList).forEach((row, index) => {
            const shapeId = highlightList[row]
            const getShapeMapped = this.getShapesMap(shapeId);
            const ShapeCtx = getShapeMapped.Shape.Graphic;
            const ShapeProperties = getShapeMapped.Shape;

            this.drawRectangle({
                Shape: ShapeCtx,
                LeftX: ShapeProperties.X,
                TopY: ShapeProperties.Y,
                Width: ShapeProperties.Width,
                Height: ShapeProperties.Height,
                Background: ShapeProperties.NormalBackColor,
                Transparency: ShapeProperties.NornalBackColorAlpha,
                BorderSize: ShapeProperties.NormalBorderSize,
                BorderColor: ShapeProperties.NormalBorderColor
            })
        })
    }

    //======================================
    // CANVAS ITEM - CREATE SHAPE WITH TEXT
    //======================================

    makeTableBetCell(args) {
        this.currentIndex += 1;

        const betAreaId = args.id;
        const actualWidth = args.Size.Width - this.currentTable.defaultBorderSize;
        const actualHeight = args.Size.Height - this.currentTable.defaultBorderSize;
        const borderSize = args.BorderSize || this.currentTable.defaultBorderSize;
        const normalAlpha = args.BackColorAlpha || this.currentTable.defaultBackColorAlpha;
        const highlightList = args.Highlight ? args.Highlight : {};
        const betAreasRowsCells = betTable['BetAreasRows'][String(this.currentRow)].length || 0;
        this.currentX = args.Cords && args.Cords.X >= 0 ? args.Cords.X - borderSize : this.currentX;
        this.currentY = args.Cords && args.Cords.Y >= 0 ? args.Cords.Y - borderSize : this.currentY;

        // CALL BACKS
        // * Can use default callbacks or your own!
        const clickCallBack = args.Events && args.Events.Click ? this[String(args.Events.Click)] : this.onShapeBetClick;
        const hoverInCallBack = args.Events && args.Events.HoverIN ? this[String(args.Events.HoverIN)] : this.multiBetHoverInShapes;
        const hoverOUTCallBack = args.Events && args.Events.HoverOUT ? this[String(args.Events.HoverOUT)] : this.multiBetHoverOutShapes;

        // SET Chip Map
        this.setCipAmountMap(betAreaId, {
            Amount: 0
        });

        const Cell = new PIXI.Graphics();

        // `this.currentTable.Development.IS_DEBUG_MODE` debugging mode for grid
        this.drawRectangle({
            Shape: Cell,
            LeftX: this.currentX,
            TopY: this.currentY,
            Width: actualWidth,
            Height: actualHeight,
            Background: '0x' + this.currentTable.Development.Grid.Background.replace('#', ''),
            Transparency: this.currentTable.Development.IS_DEBUG_MODE ? normalAlpha : 0,
            BorderSize: borderSize,
            BorderColor: '0x' + this.currentTable.Development.Grid.BorderColor.replace('#', ''),
            BorderTransparency: this.currentTable.Development.IS_DEBUG_MODE ? normalAlpha : 0
        })

        Cell.interactive = true;
        Cell.buttonMode = true;

        Cell
            .on('pointertap', clickCallBack.bind(this))

        Cell
            .on('pointerover', hoverInCallBack.bind(this))

        Cell
            .on('pointerout', hoverOUTCallBack.bind(this))


        this.pixiTableDesign.stage.addChild(Cell);

        // This is required to map all shapes
        this.setShapeMap(betAreaId, {
            Config: {
                HighlightShape: false,
            },
            Shape: {
                Width: actualWidth,
                Height: actualHeight,
                X: this.currentX,
                Y: this.currentY,
                NormalBorderSize: borderSize,
                NornalBackColorAlpha: normalAlpha,
                Graphic: Cell
            },
            HighlightShapes: highlightList,
            Id: betAreaId,
            Row: this.currentRow,
            Index: this.currentIndex
        })

        // This is required to access it on event handler
        Cell.shapeMap = this.getShapesMap(betAreaId);

        this.currentX += actualWidth;
        if (betAreasRowsCells === this.currentIndex) {
            this.currentRow += 1;
            this.currentY += actualHeight;
            this.currentX = 0;
            this.currentIndex = 0;
        }
    }

    makeTableItem(args) {
        this.currentIndex += 1;

        const mainShapeId = args.id;
        const actualWidth = args.Size.Width - this.currentTable.defaultBorderSize;
        const actualHeight = args.Size.Height - this.currentTable.defaultBorderSize;
        const fontSize = args.FontSize || this.currentTable.defaultFontSize;
        const fontFamily = args.FontFamily || this.currentTable.defaultFontFamily;
        const fontThickness = args.FontThickness || this.currentTable.defaultFontThickness;
        const fontWeight = args.FontWeight || this.currentTable.defaultFontWeight;
        const borderSize = args.BorderSize || this.currentTable.defaultBorderSize;
        const normalAlpha = args.BackColorAlpha || this.currentTable.defaultBackColorAlpha;
        const hoverBackColor = args.HoverBackColor || this.currentTable.defaultHoverBackColor;
        const hoverBorderColor = args.HoverBorderColor || this.currentTable.defaultHoverBorderColor;
        const hoverAlpha = args.HoverBackColorAlpha || this.currentTable.defaultHoverBackColorAlpha;
        const highlightList = args.Highlight ? args.Highlight : {};
        this.currentX = args.Cords && args.Cords.X >= 0 ? args.Cords.X - borderSize : this.currentX;
        this.currentY = args.Cords && args.Cords.Y >= 0 ? args.Cords.Y - borderSize : this.currentY;
        const hasCords = args.Cords && args.Cords.X >= 0 || args.Cords && args.Cords.Y >= 0 ? true : false
        const tableWidth = this.currentTable.tableWidth || this.currentX;
        const tableHeight = this.currentTable.tableHeight || this.currentY;
        const shapeBackground = args.Background && args.Background.Image ? args.Background && args.Background.Image : false;
        const shapeImageWidth = args.Background && args.Background.Width ? args.Background.Width : actualWidth / 2;
        const shapeImageHeight = args.Background && args.Background.Height ? args.Background.Height : actualHeight / 2;
        const shapeImageX = ((this.currentX - borderSize) + ((actualWidth + ((fontSize + fontThickness) / 2)) / 2));
        const shapeImageY = (this.currentY - borderSize) + (actualHeight / 2);

        // CALL BACKS
        // * Can use default callbacks or your own!
        const clickCallBack = args.Events && args.Events.Click ? this[String(args.Events.Click)] : () => {
            return {}
        };
        const hoverInCallBack = args.Events && args.Events.HoverIN ? this[String(args.Events.HoverIN)] : () => {
            return {}
        };
        const hoverOUTCallBack = args.Events && args.Events.HoverOUT ? this[String(args.Events.HoverOUT)] : () => {
            return {}
        };


        const shapeStr = args.Text || "";
        const textHoriz = (this.currentX + ((actualWidth + ((fontSize + fontThickness) / 2)) / 2))
        const textVerti = this.currentY + (actualHeight / 2)
        const textConfig = {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: args.TextColor,
            align: 'center',
            stroke: args.TextColor,
            strokeThickness: fontThickness
        }

        // SET Chip Map
        this.setCipAmountMap(mainShapeId, {
            Amount: 0
        });

        const getPreviousShapeMap = this.getShapesMap(mainShapeId);

        const Shape = (getPreviousShapeMap && getPreviousShapeMap.Shape.Graphic) ? getPreviousShapeMap.Shape.Graphic : new PIXI.Graphics();
        const ShapeImage = (shapeBackground) ? new PIXI.Sprite.fromImage(shapeBackground) : false
        const shapeText = (getPreviousShapeMap && getPreviousShapeMap.Text.TextObj) ? getPreviousShapeMap.Text.TextObj : new PIXI.Text(shapeStr, textConfig);

        // Make Shape
        this.drawRectangle({
            Shape: Shape,
            LeftX: this.currentX,
            TopY: this.currentY,
            Width: actualWidth,
            Height: actualHeight,
            Background: '0x' + args.BackColor.replace('#', ''),
            Transparency: normalAlpha,
            BorderSize: borderSize,
            BorderColor: '0x' + args.Border.replace('#', ''),
            BorderTransparency: normalAlpha
        })


        if (ShapeImage) {
            ShapeImage.width = shapeImageWidth;
            ShapeImage.height = shapeImageHeight;
            ShapeImage.x = shapeImageX;
            ShapeImage.y = shapeImageY;
            ShapeImage.anchor.set(0.5);
        }

        // Make Text inside shape
        shapeText.anchor.set(0.5);
        shapeText.x = textHoriz;
        shapeText.y = textVerti;

        // Create Interactivity
        shapeText.interactive = true;
        shapeText.buttonMode = true;
        Shape.interactive = true;
        Shape.buttonMode = true;

        // Event Handlers
        Shape
            .on('pointerover', hoverInCallBack.bind(this));

        Shape
            .on('pointerout', hoverOUTCallBack.bind(this));

        if (ShapeImage) {
            this.pixiTableDesign.stage.addChild(Shape, ShapeImage, shapeText);
        } else {
            this.pixiTableDesign.stage.addChild(Shape, shapeText);
        }

        // This is required to map all shapes
        this.setShapeMap(mainShapeId, {
            Config: {
                HighlightShape: true,
            },
            Shape: {
                Width: actualWidth,
                Height: actualHeight,
                X: this.currentX,
                Y: this.currentY,
                NormalBorderSize: borderSize,
                NormalBorderColor: '0x' + args.Border.replace('#', ''),
                NormalBackColor: '0x' + args.BackColor.replace('#', ''),
                NornalBackColorAlpha: normalAlpha,
                HoverBorderSize: borderSize,
                HoverBackColor: '0x' + hoverBackColor.replace('#', ''),
                HoverBackColorAlpha: hoverAlpha,
                HoverBorderColor: '0x' + hoverBorderColor.replace('#', ''),
                Graphic: Shape
            },
            ShapeImage: {
                Width: shapeImageWidth,
                Height: shapeImageHeight,
                X: shapeImageX,
                Y: shapeImageY,
            },
            Text: {
                String: shapeStr,
                X: textHoriz,
                Y: textVerti,
                TextObj: shapeText,
            },
            HighlightShapes: highlightList,
            Id: mainShapeId,
            Row: this.currentRow,
            Index: this.currentIndex
        })

        // This is required to access it on event handler
        Shape.shapeMap = this.getShapesMap(mainShapeId);
        shapeText.shapeMap = this.getShapesMap(mainShapeId);

        // Next X cord ->
        if (!hasCords) {
            this.currentX += actualWidth;
        }
        if (this.currentTable['MaxPerRow'][String(this.currentRow)] === this.currentIndex) {
            if (!hasCords) {
                this.currentY += actualHeight;
            }
            this.pixiTableDesign.view.setAttribute('width', tableWidth + "px");
            this.pixiTableDesign.view.setAttribute('height', (tableHeight - (borderSize * this.currentTable['MaxPerRow'][String(this.currentRow)])) + "px");
            //this.pixiTableDesign.view.setAttribute('width', "820px");
            //this.pixiTableDesign.view.setAttribute('height', "295px");
            this.currentRow += 1;
            if (!hasCords) {
                this.currentX = 0;
            }
            this.currentIndex = 0;
        }
    }

    //======================================
    // BUILD TABLE >>
    //======================================

    switchBuiltTable() {
        this.buildTableBackground();
        this.buildTableBetGrid();
    }

    switchWinningIcon(winIcon){
        this.currentWinIcon = winIcon;
    }

    buildTable() {
        this.shapesMap = {};
        this.betHistory = [];
        this.chipAmountMap = {};

        this.setChipValue(100);

        this.buildTableBackground();
        this.buildTableBetGrid();
    }

    buildTableBackground() {
        this.currentY = 0;
        this.currentX = 0;
        this.currentRow = 0;
        this.currentIndex = 0;

        this.getObjectKeys(this.currentTable['Rows']).forEach((curRow, index) => {
            this.currentTable['Rows'][curRow].map(this.makeTableItem.bind(this))
        })
    }

    buildTableBetGrid() {
        this.currentY = 0;
        this.currentX = 0;
        this.currentRow = 0;
        this.currentIndex = 0;

        this.getObjectKeys(betTable['BetAreasRows']).forEach((curRow, index) => {
            betTable['BetAreasRows'][curRow].map(this.makeTableBetCell.bind(this))
        })
    }

    createPixiCanvas() {

        // create app pixi
        this.pixiTableDesign = new PIXI.Application(this.currentTable.tableWidth, this.currentTable.tableHeight, {
            antialias: true,
            autoResize:true,
            resolution: 1,
            transparent: true,
            powerPreference: "high-performance",
            forceFXAA: true,
            forceCanvas: true,
            clearBeforeRender: true,
            legacy: true,
        });
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        // render as webgl
        this.pixiTableDesignRender = new PIXI.WebGLRenderer({
            width: this.currentTable.tableWidth,
            height: this.currentTable.tableHeight,
            antialias: true,
            autoResize:true,
            resolution: 1,
            transparent: true,
            powerPreference: "high-performance",
            forceFXAA: true,
            forceCanvas: true,
            clearBeforeRender: true,
            legacy: true,
        })
        //setup interactions by 1s delay
        this.interactionMGR = new PIXI.interaction.InteractionManager(this.pixiTableDesign, {
            interactionFrequency: 1000
        })

        const TableContainer = document.querySelector('#App')

        const TableDesign = this.makeCanvas(this.pixiTableDesign, 'tableDesign', ['canvas', 'canvas-design']);

        // Make Design Canvas
        TableContainer.appendChild(TableDesign.view);
    }

    //======================================
    // REFRSH TABLE
    //======================================
    refreshTable() {
        this.buildTable();
    }

    //======================================
    // MAKE CANVAS (U CAN CREATE MORE THAN 1)
    //======================================
    makeCanvas(app, canvasId, canvasClassList) {
        app.view.setAttribute('id', canvasId)
        canvasClassList.map(className => app.view.classList.add(className))

        return app;
    }

    eventClick(event){
        console.log("test", event)

    }

    //======================================
    // RENDER IT
    //======================================

    render() {
        this.switchWinningIcon(betTable.WinningIcon)
        this.switchTable(classicTable, false);


        return (
            <div id="App" className="App" onClick={this.eventClick.bind(this)}>
                <button className="clearBets" onClick={this.clearBets.bind(this)}>Clear Bets</button>
                <button className="undoBet" onClick={this.undoBets.bind(this)}>Undo Bet</button>
                <button className="repeatBet" onClick={this.repeatBets.bind(this)}>Repeat Bet</button>
                <button className="repeatBet" onClick={this.doubleBets.bind(this)}>Double Bet</button>
                <button className="switchClassic" onClick={this.switchTable.bind(this, classicTable)}>Switch Classic
                </button>
                <button className="switchTransparent" onClick={this.switchTable.bind(this, transparentTable)}>Switch
                    Transparent
                </button>
                <div className="saveBetList">
                    <button className="saveBets-1" onClick={this.saveBets.bind(this, 1)}>Save Bets 1</button>
                    <button className="saveBets-2" onClick={this.saveBets.bind(this, 2)}>Save Bets 2</button>
                    <button className="saveBets-3" onClick={this.saveBets.bind(this, 3)}>Save Bets 3</button>
                </div>
                <div className="placeBets-savedBetsList">
                    <button className="placeBets-savedBets-1" onClick={this.placeSavedBets.bind(this, 1)}>Plave Saved
                        Bets 1
                    </button>
                    <button className="placeBets-savedBets-2" onClick={this.placeSavedBets.bind(this, 2)}>Plave Saved
                        Bets 2
                    </button>
                    <button className="placeBets-savedBets-3" onClick={this.placeSavedBets.bind(this, 3)}>Plave Saved
                        Bets 3
                    </button>
                </div>
                <div className="special-bets-list">
                    {betTable.SpecialBets.map(specialBet => <button className={`specailBet-${specialBet.Name}`}
                                                                    key={specialBet.Id}
                                                                    onClick={this.placeSpecailBet.bind(this, specialBet.Id)}
                                                                    onMouseEnter={this.specialBetsHoverIn.bind(this, specialBet.HighlightAreas)}
                                                                    onMouseOut={this.specialBetsHoverOut.bind(this, specialBet.HighlightAreas)}>{specialBet.Name}</button>)}
                </div>
                <button className="show-winning-num" onClick={this.showWinningNum.bind(this, {
                    betShapeId: 17,
                    winAmount: 250
                })}>
                    Show Win Number
                </button>
                <div className="sgMessageBox message-area message"></div>
            </div>
        );
    }
}

export default App;
