const CPU = require("./cpu");
const creatememory = require("./creatememory");
const ins = require("./ins");

const memory = 2056 * 1064;
const writeablebites = new Uint8Array(memory.buffer);

const cpu = new CPU(creatememory(writeablebites));
``;

writeablebites[0] = ins.MOV_LIT_R1;
writeablebites[1] = 0x12;
writeablebites[2] = 0x34;

writeablebites[3] = ins.MOV_LIT_R2;
writeablebites[4] = 0xab;
writeablebites[5] = 0xcd;

writeablebites[6] = ins.ADD_REG_REG;
writeablebites[7] = 2;
writeablebites[8] = 3;

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();
