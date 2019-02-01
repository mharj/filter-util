import {expect} from 'chai';
import {describe, it} from 'mocha';
import {filterObject, filterObjectArray, FilterRequirementTypes, FilterTypes} from '../src/index';

interface ITest {
	param1: number;
	param2: string;
	param3?: number;
	param4: string;
}
const data1: ITest = {
	param1: 1,
	param2: '2',
	param3: 3,
	param4: '4',
};
const data2: ITest = {
	param1: 1,
	param2: '2',
	param4: '4',
};
const data3: object = {
	param1: 1,
	param2: '2',
	param3: 3,
	param4: '4',
	param5: 'should not exists',
};


const filter1: FilterRequirementTypes<ITest> = {
	param1: FilterTypes.REQUIRED,
	param2: FilterTypes.REQUIRED,
	param3: FilterTypes.REQUIRED,
	param4: FilterTypes.REQUIRED,
};
const filter2: FilterRequirementTypes<ITest> = {
	param1: FilterTypes.REQUIRED,
	param2: FilterTypes.REQUIRED,
	param3: FilterTypes.OPTIONAL,
	param4: FilterTypes.REQUIRED,
};
const filter3: FilterRequirementTypes<ITest> = {
	param1: FilterTypes.REQUIRED,
	param2: FilterTypes.REQUIRED,
	param3: FilterTypes.HIDDEN,
	param4: FilterTypes.REQUIRED,
};
const filter4: FilterRequirementTypes<ITest> = {
	param1: FilterTypes.REQUIRED,
	param2: FilterTypes.REQUIRED,
	param3: FilterTypes.SET_UNDEFINED,
	param4: FilterTypes.REQUIRED,
};
const filter5: FilterRequirementTypes<ITest> = {
	param1: FilterTypes.REQUIRED,
	param2: FilterTypes.REQUIRED,
	param3: FilterTypes.SET_NULL,
	param4: FilterTypes.REQUIRED,
};

describe('filter', () => {
	describe('filterObject', () => {
		it('should return resolve promise', () => {
			// all required
			expect(filterObject<ITest>(data1, filter1)).to.be.eql({param1: 1, param2: '2', param3: 3, param4: '4'});
			// param3 optional (interface)
			expect(filterObject<ITest>(data2, filter2)).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// hide param3
			expect(filterObject<ITest>(data1, filter3)).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// param3 is undefined
			expect(filterObject<ITest>(data1, filter4)).to.be.eql({param1: 1, param2: '2', param3: undefined, param4: '4'});
			// param3 is null
			expect(filterObject<ITest>(data1, filter5)).to.be.eql({param1: 1, param2: '2', param3: null, param4: '4'});
			// param5 should drop out
			expect(filterObject<ITest>(data3, filter1)).to.be.eql({param1: 1, param2: '2', param3: 3, param4: '4'});

			// test array objects
			// all required
			expect(filterObject<ITest[]>([data1], filter1)[0]).to.be.eql({param1: 1, param2: '2', param3: 3, param4: '4'});
			// param3 optional (interface)
			expect(filterObject<ITest[]>([data2], filter2)[0]).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// hide param3
			expect(filterObject<ITest[]>([data1], filter3)[0]).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// param3 is undefined
			expect(filterObject<ITest[]>([data1], filter4)[0]).to.be.eql({param1: 1, param2: '2', param3: undefined, param4: '4'});
			// param3 is null
			expect(filterObject<ITest[]>([data1], filter5)[0]).to.be.eql({param1: 1, param2: '2', param3: null, param4: '4'});

		});
	});
	describe('filterObjectArray', () => {
		it('should return resolve promise', () => {
			// all required
			expect(filterObjectArray<ITest>([data1], filter1)[0]).to.be.eql({param1: 1, param2: '2', param3: 3, param4: '4'});
			// param3 optional (interface)
			expect(filterObjectArray<ITest>([data2], filter2)[0]).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// hide param3
			expect(filterObjectArray<ITest>([data1], filter3)[0]).to.be.eql({param1: 1, param2: '2', param4: '4'});
			// param3 is undefined
			expect(filterObjectArray<ITest>([data1], filter4)[0]).to.be.eql({param1: 1, param2: '2', param3: undefined, param4: '4'});
			// param3 is null
			expect(filterObjectArray<ITest>([data1], filter5)[0]).to.be.eql({param1: 1, param2: '2', param3: null, param4: '4'});
		});
	});
});
