
const testItemSchema = new mongoose.Schema({
    name: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const TestItem = mongoose.model('TestItem', testItemSchema);
export default TestItem;