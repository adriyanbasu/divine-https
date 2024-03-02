class CPU {
  constructor(memory) {
    this.memory = memory;
    this.registersname = [
      "ip",
      "eax",
      "ebx",
      "ecx",
      "edx",
      "acc",
      "ebp",
      "esp",
      "R0",
      "R1",
      "R2",
      "R3",
      "R4",
      "R5",
      "R6",
      "R7",
      "R8",
      "R9",
      "R10",
      "R11",
      "R12",
      "R13",
      "R14",
      "R15",
    ];
    this.registers = new Map();
    for (let i = 0; i < this.registersname.length; i++) {
      this.registers.set(this.registersname[i], 0);
    }
    global.cpu = this;

    getregster();
    {
      this.registers.set("ip", this.memory.read(this.registers.get("ip")));

      for (let i = 0; i < this.registersname.length; i++) {
        this.registers.set(
          this.registersname[i],
          this.memory.read(this.registers.get(this.registersname[i])),
        );
      }
    }

    setregster(Headers);
    {
      for (let i = 0; i < Headers.length; i++) {
        this.memory.write(Headers[i], this.registers.get(Headers[i]));
      }
    }
    getmemory();
    {
      for (let i = 0; i < this.memory.length; i++) {
        if (i < this.memory.length) {
          this.memory.write(i, this.memory.read(i));
        }
      }
    }
    setmemory();
    {
      for (let i = 0; i < this.memory.length; i++) {
        this.memory.write(i, this.memory.read(i));
      }
    }
  }
  fetch() {
    const nextinstructionaddress = this.registers.get("ip");
    const instruction = this.memory.read(nextinstructionaddress);
    this.registers.set("ip", nextinstructionaddress + 1);
    return instruction;
  }
  fetch16() {
    const nextinstructionaddress = this.registers.get("ip");
    const instruction = this.memory.read(nextinstructionaddress);
    this.registers.set("ip", nextinstructionaddress + 2);
    return instruction;
  }
  exicute(instruction) {
    switch (instruction) {
      // move literal into the R1 register
      case 0x10: {
        const literal = this.fetch16();
        this.registers.set("R1", literal);
        this.registers.set("ip", this.registers.get("ip") + 1);
        break;
      }

      // move R1 into the R0 register
      case 0x11: {
        this.registers.set("R0", this.registers.get("R1"));
        this.registers.set("ip", this.registers.get("ip") + 1);
        break;
      }
      //  add register to register
      case 0x12: {
        const register = this.fetch();
        const value = this.registers.get("R1") + this.registers.get(register);
        this.registers.set("R0", value);
        this.registers.set("ip", this.registers.get("ip") + 1);
        break;
      }
    }
  }
  step() {
    const instruction = this.fetch();
    return this.exicute(instruction);
  }
}
