import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InterlayerNotice } from '../../../../base/models/Interlayer';

export class VeryBigCalculateQueryPayload {
  constructor() {}
}
//TODO: move to application layer?
@QueryHandler(VeryBigCalculateQueryPayload)
export class VeryBigCalculateQuery
  implements IQueryHandler<VeryBigCalculateQueryPayload>
{
  constructor() {}

  async execute(
    queryPayload: VeryBigCalculateQueryPayload,
  ): Promise<InterlayerNotice<VeryBigCalculateResultData>> {
    const {} = queryPayload;
    const notice = new InterlayerNotice<VeryBigCalculateResultData>();

    const result = this.doCalculate();

    console.log("VeryBigCalculateQuery")


    notice.addData({ result: result });

    return notice;
  }

  private doCalculate() {
    return Number((2 + (2 * Math.random()) / Math.random()).toFixed(2));
  }
}

@QueryHandler(VeryBigCalculateQueryPayload)
export class VeryBigCalculateQuery2
    implements IQueryHandler<VeryBigCalculateQueryPayload>
{
  constructor() {}

  async execute(
      queryPayload: VeryBigCalculateQueryPayload,
  ): Promise<InterlayerNotice<VeryBigCalculateResultData>> {
    const {} = queryPayload;
    const notice = new InterlayerNotice<VeryBigCalculateResultData>();

    const result = this.doCalculate();

    console.log("VeryBigCalculateQuery2")

    notice.addData({ result: result });

    return notice;
  }

  private doCalculate() {
    return Number((2 + (2 * Math.random()) / Math.random()).toFixed(2));
  }
}

export type VeryBigCalculateResultData = {
  result: number;
};
