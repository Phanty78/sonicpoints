import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    connectionCounter: {
      type: Number,
      default: 0,
    },
    data: {
      date: {
        type: Date,
        default: Date.now,
      },
      sonicData: {
        sonicPoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        liquidityPoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        activePoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        sonicRank: {
          type: Number,
          default: 0,
          min: 0,
        },
        history: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            sonicPoints: {
              type: Number,
              default: 0,
            },
            liquidityPoints: {
              type: Number,
              default: 0,
            },
            activePoints: {
              type: Number,
              default: 0,
            },
            sonicRank: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
      ringData: {
        ringPoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        history: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            ringPoints: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
      siloData: {
        siloPoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        siloRank: {
          type: Number,
          default: 0,
          min: 0,
        },
        history: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            siloPoints: {
              type: Number,
              default: 0,
            },
            siloRank: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
      swapXData: {
        gemXNumber: {
          type: Number,
          default: 0,
          min: 0,
        },
        history: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            gemXNumber: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ 'data.sonicData.sonicPoints': -1 });
userSchema.index({ 'data.sonicData.sonicRank': 1 });
userSchema.index({ 'data.siloData.siloRank': 1 });

const manageHistory = (history, newData) => {
  history.push({
    date: new Date(),
    ...newData,
  });

  if (history.length > 30) {
    return history.slice(-30);
  }
  return history;
};

userSchema.methods.updateSonicPoints = async function (points) {
  this.data.sonicData.sonicPoints = points;
  this.data.sonicData.history = manageHistory(this.data.sonicData.history, {
    sonicPoints: points,
    liquidityPoints: this.data.sonicData.liquidityPoints,
    activePoints: this.data.sonicData.activePoints,
    sonicRank: this.data.sonicData.sonicRank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateLiquidityPoints = async function (points) {
  this.data.sonicData.liquidityPoints = points;
  this.data.sonicData.history = manageHistory(this.data.sonicData.history, {
    sonicPoints: this.data.sonicData.sonicPoints,
    liquidityPoints: points,
    activePoints: this.data.sonicData.activePoints,
    sonicRank: this.data.sonicData.sonicRank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateActivePoints = async function (points) {
  this.data.sonicData.activePoints = points;
  this.data.sonicData.history = manageHistory(this.data.sonicData.history, {
    sonicPoints: this.data.sonicData.sonicPoints,
    liquidityPoints: this.data.sonicData.liquidityPoints,
    activePoints: points,
    sonicRank: this.data.sonicData.sonicRank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateSonicRank = async function (rank) {
  this.data.sonicData.sonicRank = rank;
  this.data.sonicData.history = manageHistory(this.data.sonicData.history, {
    sonicPoints: this.data.sonicData.sonicPoints,
    liquidityPoints: this.data.sonicData.liquidityPoints,
    activePoints: this.data.sonicData.activePoints,
    sonicRank: rank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateRingPoints = async function (points) {
  this.data.ringData.ringPoints = points;
  this.data.ringData.history = manageHistory(this.data.ringData.history, {
    ringPoints: points,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateSiloPoints = async function (points) {
  this.data.siloData.siloPoints = points;
  this.data.siloData.history = manageHistory(this.data.siloData.history, {
    siloPoints: points,
    siloRank: this.data.siloData.siloRank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateSiloRank = async function (rank) {
  this.data.siloData.siloRank = rank;
  this.data.siloData.history = manageHistory(this.data.siloData.history, {
    siloPoints: this.data.siloData.siloPoints,
    siloRank: rank,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.updateGemXNumber = async function (number) {
  this.data.swapXData.gemXNumber = number;
  this.data.swapXData.history = manageHistory(this.data.swapXData.history, {
    gemXNumber: number,
  });
  this.data.date = new Date();
  return this.save();
};

userSchema.methods.incrementConnectionCounter = async function () {
  this.connectionCounter += 1;
  this.data.date = new Date();
  return this.save();
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
